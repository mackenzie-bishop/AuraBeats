const mongoose = require("mongoose");

const focusSessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mood: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    durationMinutes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("FocusSession", focusSessionSchema);
