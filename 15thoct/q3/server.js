const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('redis');
const cron = require('node-cron');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key';

app.use(bodyParser.json());

// Redis client
const redisClient = createClient({ url: 'redis://localhost:6379' });
redisClient.on('error', (err) => console.error('Redis Error:', err));

(async () => {
  await redisClient.connect();
  console.log('✅ Connected to Redis');
})();

// In-memory DB
let users = []; // { id, username, password, email, passwordHash }
let booksDB = {}; // { userId: [ { id, title, author } ] }
let userIdCounter = 1;
let bookIdCounter = 1;

// --- Auth Middleware ---
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// --- User Routes ---
// Signup
app.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) return res.status(400).json({ error: 'Username, email and password required' });

  if (users.find(u => u.username === username)) return res.status(400).json({ error: 'Username exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = { id: userIdCounter++, username, email, passwordHash };
  users.push(newUser);
  booksDB[newUser.id] = [];
  res.status(201).json({ message: 'User created' });
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, SECRET_KEY);
  res.json({ token });
});

// --- Books & Bulk Insertion ---
// POST /books/bulk
app.post('/books/bulk', authenticate, async (req, res) => {
  const userId = req.user.id;
  const books = req.body.books;
  if (!Array.isArray(books) || books.length === 0) return res.status(400).json({ error: 'Books array required' });

  const redisKey = `bulk:${userId}`;
  await redisClient.rPush(redisKey, JSON.stringify(books));
  res.json({ message: 'Books will be added later' });
});

// --- Cron Job 1: Bulk insertion every 2 min ---
cron.schedule('*/2 * * * *', async () => {
  console.log('🕒 Running bulk insertion cron...');
  try {
    const keys = await redisClient.keys('bulk:*');
    for (const key of keys) {
      const userId = key.split(':')[1];
      const lists = await redisClient.lRange(key, 0, -1);

      let successCount = 0;
      let failCount = 0;

      for (const listStr of lists) {
        const booksArray = JSON.parse(listStr);
        booksArray.forEach(book => {
          if (book.title && book.author) {
            booksDB[userId].push({ id: bookIdCounter++, ...book });
            successCount++;
          } else failCount++;
        });
      }

      // Save status in Redis
      const statusKey = `status:${userId}`;
      await redisClient.set(statusKey, JSON.stringify({
        userId,
        successCount,
        failCount,
        processedAt: new Date().toISOString()
      }));

      await redisClient.del(key); // clear bulk queue
      console.log(`✅ Bulk insertion done for user ${userId}`);
    }
  } catch (err) {
    console.error('❌ Bulk cron error:', err);
  }
});

// --- Cron Job 2: Generate PDF & Email every 5 min ---
cron.schedule('*/5 * * * *', async () => {
  console.log('🕒 Running report cron...');
  try {
    const statusKeys = await redisClient.keys('status:*');

    for (const key of statusKeys) {
      const statusData = JSON.parse(await redisClient.get(key));
      const user = users.find(u => u.id == statusData.userId);
      if (!user) continue;

      // Create PDF
      const pdfPath = `report_user_${user.id}.pdf`;
      const doc = new PDFDocument();
      doc.pipe(fs.createWriteStream(pdfPath));
      doc.fontSize(18).text(`Bulk Insertion Report for ${user.username}`, { underline: true });
      doc.moveDown();
      doc.fontSize(14).text(`User ID: ${user.id}`);
      doc.text(`Processed At: ${statusData.processedAt}`);
      doc.text(`Successful Inserts: ${statusData.successCount}`);
      doc.text(`Failed Inserts: ${statusData.failCount}`);
      doc.end();

      // Send Email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your_email@gmail.com',
          pass: 'your_email_app_password'
        }
      });

      await transporter.sendMail({
        from: 'your_email@gmail.com',
        to: user.email,
        subject: 'Bulk Insertion Report',
        text: 'Please find attached your bulk insertion report.',
        attachments: [{ path: pdfPath }]
      });

      console.log(`📧 Report sent to ${user.email}`);

      await redisClient.del(key); // delete status after sending
      fs.unlinkSync(pdfPath); // delete local PDF
    }
  } catch (err) {
    console.error('❌ Report cron error:', err);
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
