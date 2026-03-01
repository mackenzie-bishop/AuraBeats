require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const moodRoutes = require("./routes/mood.routes");
const focusRoutes = require("./routes/focus.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("AuraBeats API is running ✅"));

app.use("/auth", authRoutes);
app.use("/moods", moodRoutes);
app.use("/focus", focusRoutes);

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  });
