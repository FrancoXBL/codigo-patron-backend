import { Router } from "express";
const router = Router();
import { matchControllers } from "../controllers/historialPartidos.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { matchSchema } from "../schemas/match.schema.js";
import { nextMatchSchema } from "../schemas/nextMatch.schema.js";

router.get("/matches", matchControllers.getMatches);

router.post(
  "/matches",
  validateSchema(matchSchema),
  matchControllers.addMatch
);

router.post(
  "/next-match",
  validateSchema(nextMatchSchema),
  matchControllers.addNextMatch
);

router.get(
  "/next-match",
  matchControllers.getNextMatch
);

router.delete(
  "/matches/:id",
  matchControllers.deleteMatch
);

router.get("/matches/date/:date", matchControllers.getMatchesByDate);

router.get("/matches/:id", matchControllers.getMatchById);

router.put(
  "/matches/:id",
  validateSchema(matchSchema),
  matchControllers.updateMatch
);

export default router;
