import mongoose from "mongoose";

const goalDetailSchema = new mongoose.Schema({
  player: { type: String, required: true },
  minute: { type: String, required: true },
  type: {
    type: String,
    required: true,
  },
});

const matchSchema = new mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  homeScore: { type: Number, required: true },
  awayScore: { type: Number, required: true },
  hour: { type: String, required: true },
  date: { type: String, required: true },
  venue: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  league: { type: String, required: true },
  season: { type: String, required: true },
  homeGoalDetails: [goalDetailSchema],
  awayGoalDetails: [goalDetailSchema],
  referee: { type: String, required: true },
  resume: { type: String, required: true },
});

export default mongoose.model("Match", matchSchema);
