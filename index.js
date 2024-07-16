import express from "express";
import { connectDB } from "./db.js";
import cors from 'cors'
import morgan from 'morgan'

import newsRoutes from "./src/routes/news.routes.js"
import matchRoutes from './src/routes/matches.routes.js'
import userRoutes from './src/routes/admin.routes.js'

const app = express();
connectDB();

app.use(cors());
app.use(morgan());
app.use(express.json());

app.use("/api", newsRoutes)
app.use("/api", matchRoutes)
app.use("/api", userRoutes)

app.listen(3000, () => {
  console.log("Server on port 3000");
});
