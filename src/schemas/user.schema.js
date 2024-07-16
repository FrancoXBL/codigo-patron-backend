import { z } from "zod";


const authSchema = z.object({
  username: z.string().min(4).max(20),
  password: z.string().min(6),
});

export { authSchema };