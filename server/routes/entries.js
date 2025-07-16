const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');

// Add new entry
router.post('/', async (req, res) => {
  try {
    const entry = new Entry(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all entries for a user
router.get('/:userId', async (req, res) => {
  const entries = await Entry.find({ userId: req.params.userId });
  res.json(entries);
});

module.exports = router;
