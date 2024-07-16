import { z } from 'zod';


export const nextMatchSchema = z.object({
  homeTeam: z.string().nonempty("Home team is required"),
  awayTeam: z.string().nonempty("Away team is required"),
  hour: z.string(),
  date: z.string(),
  venue: z.string().nonempty("Venue is required"),
  city: z.string().nonempty("City is required"),
  country: z.string().nonempty("Country is required"),
  league: z.string().nonempty("League is required"),
  season: z.string().nonempty("Season is required"),
});