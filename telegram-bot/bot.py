import os
import logging
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from pdf_generator import generate_contract_pdf
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(
    format='%(asctime)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

TOKEN = os.getenv("BOT_TOKEN")

TEMPLATE_MESSAGE = (
    "📋 Заполните данные клиента и отправьте мне обратно:\n\n"
    "ФИО клиента: \n"
    "Адрес объекта: \n"
    "Площадь (м²): \n"
    "Пакет услуг: \n"
    "Сумма (тг): \n"
    "Дата договора: \n"
    "Телефон клиента: \n"
    "ИИН клиента: "
)


def parse_fields(text: str) -> dict:
    fields = {}
    for line in text.strip().split('\n'):
        if ':' in line:
            key, _, value = line.partition(':')
            key = key.strip()
            value = value.strip()
            if value:
                fields[key] = value
    return fields


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Привет! Я помогу создать договор.\n\n"
        "Отправьте /contract чтобы получить шаблон для заполнения."
    )


async def contract_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(TEMPLATE_MESSAGE)


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = update.message.text

    if "ФИО клиента" not in text:
        await update.message.reply_text(
            "Отправьте /contract чтобы получить шаблон для заполнения."
        )
        return

    fields = parse_fields(text)

    required_keys = ["ФИО клиента", "Адрес объекта", "Площадь (м²)"]
    missing = [k for k in required_keys if k not in fields or not fields[k]]

    if missing:
        await update.message.reply_text(
            "❌ Не заполнены обязательные поля:\n" +
            "\n".join(f"• {k}" for k in missing) +
            "\n\nОтправьте /contract для нового шаблона."
        )
        return

    await update.message.reply_text("⏳ Генерирую договор...")

    try:
        pdf_path = generate_contract_pdf(fields)

        with open(pdf_path, 'rb') as pdf_file:
            client_name = fields.get('ФИО клиента', 'клиент').replace(' ', '_')
            await update.message.reply_document(
                document=pdf_file,
                filename=f"Договор_{client_name}.pdf",
                caption="✅ Договор готов!"
            )

        os.remove(pdf_path)

    except FileNotFoundError as e:
        logger.error(f"Font error: {e}")
        await update.message.reply_text(
            "❌ Ошибка: шрифт не найден.\n"
            "На сервере выполните: sudo apt-get install fonts-dejavu"
        )
    except Exception as e:
        logger.error(f"Error generating PDF: {e}")
        await update.message.reply_text(f"❌ Ошибка при создании договора: {str(e)}")


def main():
    if not TOKEN:
        raise ValueError("BOT_TOKEN не задан в файле .env")

    app = Application.builder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("contract", contract_command))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    logger.info("Бот запущен...")
    app.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
