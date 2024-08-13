import Match from "../models/historialPartidos.model.js";
import nextMatch from "../models/nextMatch.model.js";

// Obtener todos los partidos
const getMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNextMatch = async (req, res) => {
  try {
    const match = await nextMatch.find().sort({ _id: -1 }).limit(3);
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addNextMatch = async (req, res) => {
  try {
    const {
      homeTeam,
      awayTeam,
      hour,
      date,
      venue,
      city,
      country,
      league
    } = req.body;

    const newMatch = new nextMatch({
      homeTeam,
      awayTeam,
      hour,
      date,
      venue,
      city,
      country,
      league,
      season
    });
    const savedNextMatch = await newMatch.save();
    res.status(201).json(savedNextMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Obtener partidos por fecha
const getMatchesByDate = async (req, res) => {
  const date = req.params.date;
  try {
    const matches = await Match.find({ date: new Date(date) });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un partido por su ID
const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ message: "Partido no encontrado" });
    }
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Agregar un nuevo partido
const addMatch = async (req, res) => {
  try {
    const {
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      hour,
      date,
      venue,
      city,
      country,
      league,
      season,
      homeGoalDetails,
      awayGoalDetails,
      referee,
      resume
    } = req.body;

    const newMatch = new Match({
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      hour,
      date,
      venue,
      city,
      country,
      league,
      season,
      homeGoalDetails,
      awayGoalDetails,
      referee,
      resume
    });
    const savedMatch = await newMatch.save();
    res.status(201).json(savedMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un partido por su ID
const deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) {
      return res.status(404).json({ message: "Partido no encontrado" });
    }
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un partido por su ID
const updateMatch = async (req, res) => {
  try {
    const {
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      hour,
      date,
      venue,
      city,
      country,
      league,
      season,
      homeGoalDetails,
      awayGoalDetails,
      referee
    } = req.body;

    const updatedMatch = await Match.findByIdAndUpdate(
      req.params.id,
      {
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
        hour,
        date,
        venue,
        city,
        country,
        league,
        season,
        homeGoalDetails,
        awayGoalDetails,
        referee
      },
      { new: true, runValidators: true }
    );
    if (!updatedMatch) {
      return res.status(404).json({ message: "Partido no encontrado" });
    }
    res.json(updatedMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const matchControllers = {
  getMatches,
  getMatchById,
  addMatch,
  deleteMatch,
  updateMatch,
  getMatchesByDate,
  getNextMatch,
  addNextMatch
};