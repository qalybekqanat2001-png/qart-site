const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const TelegramBot = require('node-telegram-bot-api');
const PDFDocument = require('pdfkit');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: '*' }));

const BOT_TOKEN = process.env.BOT_TOKEN;
const OWNER_ID  = process.env.OWNER_CHAT_ID;

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// ── PDF генератор анкеты ──────────────────────────────────────────────────
const FONT_DIR = path.join(__dirname, 'fonts');

function generateAnketaPDF(name, phone, answers) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margins: { top: 50, bottom: 60, left: 50, right: 50 } });
    const chunks = [];
    doc.on('data', c => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    try {
      doc.registerFont('DJ',  path.join(FONT_DIR, 'DejaVu.ttf'));
      doc.registerFont('DJB', path.join(FONT_DIR, 'DejaVu-Bold.ttf'));
    } catch (e) {
      // шрифт не найден — fallback на встроенный (без кириллицы), не крашимся
      console.error('Font error:', e.message);
    }

    const W = doc.page.width - 100;
    const L = 50;
    const date = new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });

    // Шапка
    doc.font('DJB').fontSize(18).fillColor('#111111').text('QIALL DESIGN', L, 50);
    doc.font('DJ').fontSize(9).fillColor('#777777')
       .text(`Анкета заполнена: ${date}`, L, 56, { align: 'right', width: W });
    const lineY = 76;
    doc.moveTo(L, lineY).lineTo(L + W, lineY).strokeColor('#111111').lineWidth(1.5).stroke();

    // Клиент
    const cy = lineY + 12;
    doc.font('DJ').fontSize(8).fillColor('#999999').text('ИМЯ', L, cy);
    doc.font('DJB').fontSize(12).fillColor('#111111').text(name || '—', L, cy + 10, { width: 200 });
    doc.font('DJ').fontSize(8).fillColor('#999999').text('ТЕЛЕФОН', L + 250, cy);
    doc.font('DJB').fontSize(12).fillColor('#111111').text(phone || '—', L + 250, cy + 10, { width: 200 });
    doc.y = cy + 36;

    // Разделы
    answers.forEach(section => {
      if (doc.y > doc.page.height - 160) doc.addPage();
      doc.moveDown(0.4);

      // Заголовок раздела
      doc.font('DJB').fontSize(9).fillColor('#444444').text(section.title.toUpperCase(), L, doc.y);
      doc.moveDown(0.2);
      doc.moveTo(L, doc.y).lineTo(L + W, doc.y).strokeColor('#cccccc').lineWidth(0.5).stroke();
      doc.moveDown(0.4);

      // Строки
      section.items.forEach(({ label, value }) => {
        if (doc.y > doc.page.height - 80) doc.addPage();
        const rowY = doc.y;
        const col1 = 160;
        const col2 = W - col1 - 10;

        doc.font('DJB').fontSize(9).fillColor('#666666').text(label + ':', L, rowY, { width: col1 });
        const afterLabel = doc.y;

        doc.font('DJ').fontSize(9).fillColor('#222222').text(value, L + col1 + 10, rowY, { width: col2 });
        const afterValue = doc.y;

        doc.y = Math.max(afterLabel, afterValue) + 3;
      });
    });

    // Футер
    const footY = doc.page.height - 45;
    doc.font('DJ').fontSize(8).fillColor('#bbbbbb')
       .text(`Документ сформирован автоматически. QiAll Design, ${date}`, L, footY, { align: 'center', width: W });

    doc.end();
  });
}

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
app.post('/api/submit-anketa', async (req, res) => {
  const { name = 'Клиент', phone = '—', summary = '', answers = [], skipTelegram = false } = req.body || {};
  const header = `📋 Анкета заполнена\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}`;

  try {
    const pdfBuf = await generateAnketaPDF(name, phone, answers);
    const pdfB64 = pdfBuf.toString('base64');

    if (!skipTelegram) {
      bot.sendDocument(
        OWNER_ID,
        pdfBuf,
        { caption: header },
        { filename: 'Anketa-QiAll.pdf', contentType: 'application/pdf' }
      ).catch(err => {
        console.error('Telegram doc error:', err.message);
        if (summary) {
          bot.sendMessage(OWNER_ID, (header + '\n\n' + summary).slice(0, 4096)).catch(() => {});
        }
      });
    }

    res.json({ ok: true, pdf: pdfB64 });
  } catch (err) {
    console.error('PDF gen error:', err.message);
    if (!skipTelegram && summary) {
      bot.sendMessage(OWNER_ID, (header + '\n\n' + summary).slice(0, 4096)).catch(() => {});
    }
    res.json({ ok: true, pdf: null });
  }
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
