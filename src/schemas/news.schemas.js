import { z } from "zod";

// Definir el esquema de la noticia
const newsSchema = z.object({
  title: z.string().min(1).max(255), // Título de la noticia, entre 1 y 255 caracteres
  type: z.string().min(1).max(255),
  img: z.string().url(), // URL de la imagen asociada a la noticia
  body: z.string(), // Cuerpo de la noticia
  date: z.string(), // Fecha de la noticia
});

export { newsSchema };
