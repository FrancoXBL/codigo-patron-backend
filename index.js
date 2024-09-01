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
  "http://localhost:5174",
  "https://codigo-patron.up.railway.app",
  "https://codigopatron.com.ar",
];

// Configuración de CORS
app.use(
  cors({
    origin: whiteList,
  })
);

// Configuración de morgan para logging
app.use(morgan("combined"));

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.use("/api", newsRoutes);
app.use("/api", matchRoutes);
app.use("/api", userRoutes);

// Maneja el historial del enrutador para aplicaciones de una sola página
app.use(history());

// Configuración de archivos estáticos
app.use(express.static("public"));

// Ruta principal para servir el frontend
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
