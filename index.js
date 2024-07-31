import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import morgan from "morgan";
import history from "connect-history-api-fallback";
import dotenv from "dotenv";

import newsRoutes from "./src/routes/news.routes.js";
import matchRoutes from "./src/routes/matches.routes.js";
import userRoutes from "./src/routes/admin.routes.js";

dotenv.config();

const app = express();
connectDB();

const whiteList = [
  "https://codigo-patron-backend-production.up.railway.app",
  "https://codigopatron.com.ar",
];
app.use(
  cors({
    origin: whiteList,
  })
);
app.use(morgan("combined"));
app.use(express.json());

app.use("/api", newsRoutes);
app.use("/api", matchRoutes);
app.use("/api", userRoutes);
app.use(history());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
