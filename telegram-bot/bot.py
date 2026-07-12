import json
import logging
import os
from datetime import date

from dotenv import load_dotenv
from telegram import KeyboardButton, ReplyKeyboardMarkup, ReplyKeyboardRemove, Update, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters

from counter import confirm_number, get_next_number
from docx_generator import generate_contract_docx
from pdf_generator import generate_contract_pdf

load_dotenv()

logging.basicConfig(
    format="%(asctime)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

TOKEN = os.getenv("BOT_TOKEN")
WEBAPP_URL = os.getenv("WEBAPP_URL", "https://qiall-design.kz/contract-app.html")
OWNER_CHAT_ID = os.getenv("OWNER_CHAT_ID")  # опционально: ограничить бота одним пользователем


def is_authorized(update: Update) -> bool:
    if not OWNER_CHAT_ID:
        return True
    return str(update.effective_chat.id) == str(OWNER_CHAT_ID)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_authorized(update):
        await update.message.reply_text("Этот бот доступен только владельцу.")
        return
    await update.message.reply_text(
        "Привет! Я собираю договоры QiAll Design.\n\n"
        "Отправьте /newcontract, чтобы заполнить форму нового договора."
    )


async def newcontract_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_authorized(update):
        await update.message.reply_text("Этот бот доступен только владельцу.")
        return

    next_number = get_next_number()
    today = date.today().isoformat()
    url = f"{WEBAPP_URL}?number={next_number}&date={today}"

    keyboard = ReplyKeyboardMarkup(
        [[KeyboardButton("📝 Заполнить договор", web_app=WebAppInfo(url=url))]],
        resize_keyboard=True,
        one_time_keyboard=True,
    )
    await update.message.reply_text(
        f"Предлагаемый номер договора: {next_number} (можно изменить в форме).",
        reply_markup=keyboard,
    )


async def handle_web_app_data(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_authorized(update):
        return

    raw = update.message.web_app_data.data
    try:
        fields = json.loads(raw)
    except json.JSONDecodeError:
        await update.message.reply_text("❌ Не удалось прочитать данные формы.")
        return

    fields["composition"] = fields.get("composition") or []

    await update.message.reply_text("⏳ Генерирую договор...", reply_markup=ReplyKeyboardRemove())

    try:
        docx_path = generate_contract_docx(fields)
        pdf_path = generate_contract_pdf(fields)

        client_name = (fields.get("fio") or "клиент").replace(" ", "_")
        number = fields.get("number", "")

        with open(docx_path, "rb") as f:
            await update.message.reply_document(
                document=f,
                filename=f"Договор_№{number}_{client_name}.docx",
            )
        with open(pdf_path, "rb") as f:
            await update.message.reply_document(
                document=f,
                filename=f"Договор_№{number}_{client_name}.pdf",
                caption="✅ Договор готов. Проверьте и отправьте клиенту сами.",
            )

        os.remove(docx_path)
        os.remove(pdf_path)
        confirm_number(number)

    except FileNotFoundError as e:
        logger.error(f"Font error: {e}")
        await update.message.reply_text(
            "❌ Ошибка: шрифт не найден.\n"
            "На сервере выполните: sudo apt-get install fonts-dejavu"
        )
    except Exception as e:
        logger.error(f"Error generating contract: {e}")
        await update.message.reply_text(f"❌ Ошибка при создании договора: {e}")


def main():
    if not TOKEN:
        raise ValueError("BOT_TOKEN не задан в файле .env")

    app = Application.builder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("newcontract", newcontract_command))
    app.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, handle_web_app_data))

    logger.info("Бот запущен...")
    app.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
