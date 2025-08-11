import Court from '../models/Court.js';

// Get courts by category (sport type)
export const getCourtsByCategory = async (req, res) => {
  try {
    const { sportType } = req.query;
    const filter = sportType ? { sportType } : {};
    const courts = await Court.find(filter);
    res.json(courts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
