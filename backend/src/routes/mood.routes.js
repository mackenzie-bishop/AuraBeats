const express = require("express");
const { getMoods, getRecommendations } = require("../utils/recommendations");

const router = express.Router();

// List moods (public)
router.get("/", (req, res) => {
  return res.json({ moods: getMoods() });
});

// Recommendations for a mood (public)
router.get("/recommendations", (req, res) => {
  const mood = req.query.mood;
  if (!mood) return res.status(400).json({ message: "mood query param required" });

  return res.json({ mood, recommendations: getRecommendations(mood) });
});

module.exports = router;
