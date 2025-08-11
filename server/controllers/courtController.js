const Court = require('../models/Court');

// Create a new court
exports.createCourt = async (req, res) => {
  try {
    const court = new Court(req.body);
    await court.save();
    res.status(201).json(court);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all courts for a venue
exports.getCourtsByVenue = async (req, res) => {
  try {
    const courts = await Court.find({ venue: req.params.venueId });
    res.json(courts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single court by ID
exports.getCourtById = async (req, res) => {
  try {
    const court = await Court.findById(req.params.id);
    if (!court) return res.status(404).json({ error: 'Court not found' });
    res.json(court);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update court
exports.updateCourt = async (req, res) => {
  try {
    const court = await Court.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!court) return res.status(404).json({ error: 'Court not found' });
    res.json(court);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete court
exports.deleteCourt = async (req, res) => {
  try {
    const court = await Court.findByIdAndDelete(req.params.id);
    if (!court) return res.status(404).json({ error: 'Court not found' });
    res.json({ message: 'Court deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
