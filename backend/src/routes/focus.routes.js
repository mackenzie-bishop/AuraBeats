const express = require("express");
const auth = require("../middleware/auth");
const FocusSession = require("../models/FocusSession");

const router = express.Router();

// Start a focus session
router.post("/start", auth, async (req, res) => {
  try {
    const { mood } = req.body || {};
    if (!mood) return res.status(400).json({ message: "mood required" });

    const session = await FocusSession.create({
      userId: req.user.id,
      mood,
      startTime: new Date(),
      durationMinutes: 0
    });

    return res.status(201).json({ session });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: String(err) });
  }
});

// End a focus session
router.post("/end", auth, async (req, res) => {
  try {
    const { sessionId } = req.body || {};
    if (!sessionId) return res.status(400).json({ message: "sessionId required" });

    const session = await FocusSession.findOne({ _id: sessionId, userId: req.user.id });
    if (!session) return res.status(404).json({ message: "Session not found" });

    const endTime = new Date();
    session.endTime = endTime;

    const ms = endTime.getTime() - new Date(session.startTime).getTime();
    const minutes = Math.max(0, Math.round(ms / 60000));
    session.durationMinutes = minutes;

    await session.save();

    return res.json({ session });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: String(err) });
  }
});

// Get history
router.get("/history", auth, async (req, res) => {
  try {
    const sessions = await FocusSession.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);

    return res.json({ sessions });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: String(err) });
  }
});

module.exports = router;
