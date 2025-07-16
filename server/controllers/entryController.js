const Entry = require('../models/Entry');

exports.addEntry = async (req, res) => {
  try {
    const entry = new Entry(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getEntriesByUser = async (req, res) => {
  const entries = await Entry.find({ userId: req.params.userId });
  res.json(entries);
};
