
import Venue from '../models/Venue.js';

// Create a new venue
export const createVenue = async (req, res) => {
  try {
    const venue = new Venue({ ...req.body, owner: req.user._id });
    await venue.save();
    res.status(201).json(venue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all venues (optionally filter by approval)
export const getVenues = async (req, res) => {
  try {
    const filter = req.query.approvalStatus ? { approvalStatus: req.query.approvalStatus } : {};
    const venues = await Venue.find(filter).populate('owner', 'fullName email');
    res.json(venues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single venue by ID
export const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id).populate('owner', 'fullName email');
    if (!venue) return res.status(404).json({ error: 'Venue not found' });
    res.json(venue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update venue (owner or admin)
export const updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!venue) return res.status(404).json({ error: 'Venue not found' });
    res.json(venue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete venue (owner or admin)
export const deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id);
    if (!venue) return res.status(404).json({ error: 'Venue not found' });
    res.json({ message: 'Venue deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve or reject venue (admin)
export const approveVenue = async (req, res) => {
  try {
    const { approvalStatus, comments } = req.body;
    const venue = await Venue.findByIdAndUpdate(
      req.params.id,
      { approvalStatus, approvalComments: comments },
      { new: true }
    );
    if (!venue) return res.status(404).json({ error: 'Venue not found' });
    res.json(venue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


