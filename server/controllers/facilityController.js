import Venue from '../models/Venue.js';
import Court from '../models/Court.js';

// Get all approved facilities (venues)
export const getAllFacilities = async (req, res) => {
  try {
    const venues = await Venue.find({ approvalStatus: 'approved' });
    res.json(venues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single facility by ID
export const getFacilityById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ error: 'Facility not found' });
    res.json(venue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get courts for a facility (venue)
export const getCourtsByFacility = async (req, res) => {
  try {
    const courts = await Court.find({ venue: req.params.venueId });
    res.json(courts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
