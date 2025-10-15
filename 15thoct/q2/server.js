const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('redis');
const cron = require('node-cron');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
let users = []; // { id, username, passwordHash }
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
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  const existingUser = users.find(u => u.username === username);
  if (existingUser) return res.status(400).json({ error: 'Username already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = { id: userIdCounter++, username, passwordHash };
  users.push(newUser);
  booksDB[newUser.id] = [];
  res.status(201).json({ message: 'User created successfully' });
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ error: 'Invalid username or password' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(400).json({ error: 'Invalid username or password' });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY);
  res.json({ token });
});

// --- Book Routes ---
// GET /books with Redis caching
app.get('/books', authenticate, async (req, res) => {
  const userId = req.user.id;
  const cacheKey = `books:${userId}`;

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log('📦 Cache hit for user', userId);
      return res.json(JSON.parse(cached));
    }

    console.log('🚀 Cache miss for user', userId);
    const books = booksDB[userId] || [];
    await redisClient.set(cacheKey, JSON.stringify(books), { EX: 120 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /books - add a book
app.post('/books', authenticate, async (req, res) => {
  const userId = req.user.id;
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'Title and author required' });

  const newBook = { id: bookIdCounter++, title, author };
  booksDB[userId].push(newBook);

  await redisClient.del(`books:${userId}`);
  console.log('🧹 Cache invalidated for user', userId);

  res.status(201).json(newBook);
});

// PUT /books/:id - update a book
app.put('/books/:id', authenticate, async (req, res) => {
  const userId = req.user.id;
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = booksDB[userId].find(b => b.id === bookId);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  if (title) book.title = title;
  if (author) book.author = author;

  await redisClient.del(`books:${userId}`);
  console.log('🧹 Cache invalidated for user', userId);

  res.json(book);
});

// DELETE /books/:id - delete a book
app.delete('/books/:id', authenticate, async (req, res) => {
  const userId = req.user.id;
  const bookId = parseInt(req.params.id);

  const index = booksDB[userId].findIndex(b => b.id === bookId);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  const deleted = booksDB[userId].splice(index, 1);
  await redisClient.del(`books:${userId}`);
  console.log('🧹 Cache invalidated for user', userId);

  res.json({ message: 'Book deleted', deleted });
});

// POST /books/bulk - store bulk books in Redis
app.post('/books/bulk', authenticate, async (req, res) => {
  const userId = req.user.id;
  const bulkBooks = req.body.books; // array of { title, author }
  if (!Array.isArray(bulkBooks) || bulkBooks.length === 0)
    return res.status(400).json({ error: 'Books array required' });

  const redisKey = `bulk:${userId}`;
  await redisClient.rPush(redisKey, JSON.stringify(bulkBooks));
  res.json({ message: 'Books will be added later' });
});

// Cron job every 2 minutes to process bulk books
cron.schedule('*/2 * * * *', async () => {
  console.log('🕒 Running cron job for bulk books...');
  try {
    const keys = await redisClient.keys('bulk:*');

    for (const key of keys) {
      const userId = key.split(':')[1];
      const lists = await redisClient.lRange(key, 0, -1);

      for (const listStr of lists) {
        const booksArray = JSON.parse(listStr);
        booksArray.forEach(book => {
          booksDB[userId].push({ id: bookIdCounter++, ...book });
        });
      }

      await redisClient.del(key);
      await redisClient.del(`books:${userId}`); // invalidate user cache
      console.log(`✅ Processed bulk books for user ${userId}`);
    }
  } catch (err) {
    console.error('❌ Error in cron job:', err);
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
