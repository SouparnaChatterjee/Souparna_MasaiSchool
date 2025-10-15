const express = require('express');
const { createClient } = require('redis');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const CACHE_KEY = 'items:all';

// Simulated "Database"
let items = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' }
];

// Middleware
app.use(bodyParser.json());

// Redis Setup
const redisClient = createClient({ url: 'redis://localhost:6379' });
redisClient.on('error', (err) => console.error('❌ Redis error:', err));

(async () => {
  await redisClient.connect();
  console.log('✅ Connected to Redis');
})();

// GET /items — Fetch from cache or DB
app.get('/items', async (req, res) => {
  try {
    const cachedData = await redisClient.get(CACHE_KEY);
    if (cachedData) {
      console.log('📦 Cache Hit');
      return res.json(JSON.parse(cachedData));
    }

    console.log('🚀 Cache Miss — Fetching from DB');
    await redisClient.set(CACHE_KEY, JSON.stringify(items), { EX: 60 }); // Cache for 60 sec
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /items — Add item and invalidate cache
app.post('/items', async (req, res) => {
  const { name } = req.body;
  const newItem = { id: Date.now(), name };
  items.push(newItem);
  console.log('🆕 Item added:', newItem);

  await redisClient.del(CACHE_KEY);
  console.log('🧹 Cache invalidated after POST');
  res.status(201).json(newItem);
});

// PUT /items/:id — Update item and invalidate cache
app.put('/items/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });

  items[index].name = name;
  console.log('✏️ Item updated:', items[index]);

  await redisClient.del(CACHE_KEY);
  console.log('🧹 Cache invalidated after PUT');
  res.json(items[index]);
});

// DELETE /items/:id — Delete item and invalidate cache
app.delete('/items/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });

  const deleted = items.splice(index, 1);
  console.log('🗑️ Item deleted:', deleted);

  await redisClient.del(CACHE_KEY);
  console.log('🧹 Cache invalidated after DELETE');
  res.json({ message: 'Item deleted successfully' });
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
