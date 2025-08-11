import axios from 'axios';

export const getLocationSuggestions = async (req, res) => {
  try {
    const { query } = req.query; // user typed value e.g., "pu"
    const apiKey = process.env.GEOAPIFY_KEY; // store in .env

    const response = await axios.get('https://api.geoapify.com/v1/geocode/autocomplete', {
      params: {
        text: query,
        limit: 5,
        apiKey
      }
    });

    const suggestions = response.data.features.map(item => ({
      name: item.properties.formatted,
      lat: item.properties.lat,
      lon: item.properties.lon
    }));

    res.json({ success: true, suggestions });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Error fetching location suggestions' });
  }
};
