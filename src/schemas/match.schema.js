import { z } from 'zod';

const goalDetailSchema = z.object({
  player: z.string().nonempty("Player is required"),
  minute: z.string().nonempty('minute is requeried'),
  type: z.string()
});

export const matchSchema = z.object({
  homeTeam: z.string().nonempty("Home team is required"),
  awayTeam: z.string().nonempty("Away team is required"),
  homeScore: z.number().int("Home score must be an integer").nonnegative("Home score must be non-negative"),
  awayScore: z.number().int("Away score must be an integer").nonnegative("Away score must be non-negative"),
  hour: z.string(),
  date: z.string(),
  venue: z.string().nonempty("Venue is required"),
  city: z.string().nonempty("City is required"),
  country: z.string().nonempty("Country is required"),
  league: z.string().nonempty("League is required"),
  season: z.string().nonempty("Season is required"),
  homeGoalDetails: z.array(goalDetailSchema),
  awayGoalDetails: z.array(goalDetailSchema),
  referee: z.string().nonempty("Referee is required"),
  resume: z.string().nonempty("Agregar el resumen")
});
