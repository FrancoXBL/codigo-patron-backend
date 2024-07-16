import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    description: "El título de la noticia",
  },
  type: {
    type: String,
    required: true,
    description: "El tipo de la noticia",
  },
  img: {
    type: String,
    required: true,
    description: "URL de la imagen asociada a la noticia",
    match: /^https?:\/\/.+/, // Asegura que es una URL válida
  },
  body: {
    type: String,
    required: true,
    description:
      "El cuerpo de la noticia que puede contener texto, videos e imágenes",
  },
  date: {
    type: String,
    required: true,
    description: "La fecha de la noticia en formato YYYY-MM-DD",
  },
});

export default mongoose.model("News", newsSchema);
