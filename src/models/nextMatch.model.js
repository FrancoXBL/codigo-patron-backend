import mongoose from "mongoose";


const nextMatchSchema = new mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  hour: { type: String, required: true },
  date: { type: String, required: true },
  venue: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  league: { type: String, required: true },
  season: { type: String, required: true },
});

export default mongoose.model('nextMatch', nextMatchSchema);