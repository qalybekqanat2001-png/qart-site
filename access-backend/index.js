const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: '*' }));

const BOT_TOKEN = process.env.BOT_TOKEN;
const OWNER_ID  = process.env.OWNER_CHAT_ID;

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Хранилище запросов (память, сбрасывается при перезапуске)
const requests = new Map();

// Удаляем запросы старше 24 часов
setInterval(() => {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  for (const [id, r] of requests) {
    if (r.createdAt < cutoff) requests.delete(id);
  }
}, 60 * 60 * 1000);

// ── POST /api/request ──────────────────────────────────────────────────────
app.post('/api/request', (req, res) => {
  const { name, phone } = req.body || {};
  if (!name || !phone) return res.status(400).json({ error: 'name and phone required' });

  const id = uuidv4();
  requests.set(id, { id, name, phone, status: 'pending', token: null, createdAt: Date.now() });

  bot.sendMessage(
    OWNER_ID,
    `📋 *Запрос доступа к анкете*\n\n👤 *Имя:* ${name}\n📞 *Телефон:* ${phone}`,
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[
          { text: '✅ Разрешить', callback_data: `approve:${id}` },
          { text: '❌ Отказать',  callback_data: `deny:${id}`    }
        ]]
      }
    }
  ).catch(err => console.error('Telegram send error:', err.message));

  res.json({ id });
});

// ── GET /api/status/:id ───────────────────────────────────────────────────
app.get('/api/status/:id', (req, res) => {
  const r = requests.get(req.params.id);
  if (!r) return res.status(404).json({ error: 'not found' });
  res.json({
    status: r.status,
    token:  r.status === 'approved' ? r.token : null
  });
});

// ── POST /api/submit-anketa ───────────────────────────────────────────────
app.post('/api/submit-anketa', (req, res) => {
  const { name = 'Клиент', phone = '—', summary = '', pdf } = req.body || {};
  const header = `📋 Анкета заполнена\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}`;

  if (pdf) {
    // Клиент прислал PDF в base64 — отправляем документом
    const buf = Buffer.from(pdf, 'base64');
    bot.sendDocument(
      OWNER_ID,
      buf,
      { caption: header },
      { filename: 'Anketa-QiAll.pdf', contentType: 'application/pdf' }
    ).catch(err => {
      console.error('Telegram doc error:', err.message);
      // Фолбэк: отправить текстом
      if (summary) {
        bot.sendMessage(OWNER_ID, (header + '\n\n' + summary).slice(0, 4096)).catch(() => {});
      }
    });
  } else if (summary) {
    // PDF не пришёл — отправляем текстом
    const full = header + '\n\n' + summary;
    // Разбиваем на части по 4096 символов (лимит Telegram)
    for (let i = 0; i < full.length; i += 4096) {
      bot.sendMessage(OWNER_ID, full.slice(i, i + 4096)).catch(err => console.error('Telegram msg error:', err.message));
    }
  }

  res.json({ ok: true });
});

// ── Telegram callback ──────────────────────────────────────────────────────
bot.on('callback_query', async (q) => {
  const [action, id] = (q.data || '').split(':');
  const r = requests.get(id);

  if (!r) {
    bot.answerCallbackQuery(q.id, { text: 'Запрос не найден или истёк' });
    return;
  }

  if (action === 'approve') {
    r.token  = uuidv4();
    r.status = 'approved';
    bot.answerCallbackQuery(q.id, { text: '✅ Доступ открыт' });
    bot.editMessageText(
      `✅ *Доступ разрешён*\n\n👤 ${r.name}\n📞 ${r.phone}`,
      { chat_id: q.message.chat.id, message_id: q.message.message_id, parse_mode: 'Markdown' }
    );
  } else if (action === 'deny') {
    r.status = 'denied';
    bot.answerCallbackQuery(q.id, { text: '❌ Отказано' });
    bot.editMessageText(
      `❌ *Запрос отклонён*\n\n👤 ${r.name}\n📞 ${r.phone}`,
      { chat_id: q.message.chat.id, message_id: q.message.message_id, parse_mode: 'Markdown' }
    );
  }
});

bot.on('polling_error', err => console.error('Polling error:', err.message));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Access backend running on port ${PORT}`));
