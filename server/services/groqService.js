import Groq from "groq-sdk";
import dotenv from "dotenv";
import Booking from '../models/Booking.js';

dotenv.config();

// Validate environment variable
const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.GROQ;
if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not defined in environment variables");
}

const groq = new Groq({
  apiKey: GROQ_API_KEY
});

const MODEL = "meta-llama/llama-4-scout-17b-16e-instruct"; // or "llama3-70b-8192", etc.

export const queryLLM = async (prompt) => {
  try {
    if (!prompt || typeof prompt !== "string") {
      throw new Error("Prompt must be a non-empty string");
    }

    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 1024
    });

    if (!completion?.choices?.[0]?.message?.content) {
      throw new Error("Invalid response structure from Groq API");
    }

    return completion.choices[0].message.content.trim();
  } catch (err) {
    console.error("Groq API Error:", {
      message: err.message,
      status: err.status || "Unknown"
    });
    throw new Error(`Failed to query Groq LLM: ${err.message}`);
  }
};


// Analyze user booking pattern and recommend courts/sports
export const getGroqRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    // Fetch user's previous bookings
    const bookings = await Booking.find({ user: userId }).populate('court');
    const bookingHistory = bookings.map(b => ({
      date: b.date,
      sportType: b.court?.sportType,
      timeSlot: b.timeSlot,
      venue: b.venue,
    }));

    // Current booking request (if any)
    const current = req.body || {};

    // Prepare prompt for Groq LLM
    const prompt = `User's previous bookings: ${JSON.stringify(bookingHistory)}.\nCurrent request: ${JSON.stringify(current)}.\nBased on the user's history and current request, suggest personalized recommendations for sports, courts, or time slots.`;

    // Call Groq LLM
    const recommendation = await queryLLM(prompt);
    res.json({ recommendation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};