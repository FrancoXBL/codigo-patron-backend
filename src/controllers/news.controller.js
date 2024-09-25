import News from "../models/news.model.js";
import date from "../../data/date.js";

// Obtener noticias con paginación y filtro opcional por título
const getNews = async (req, res) => { try { // Obtener el texto de búsqueda y el número de página de los parámetros de consulta const search = req.query.search || ''; const page = parseInt(req.query.page, 10) || 1; // Página actual, por defecto 1 const limit = 10; // Número de noticias por página

  // Calcular el número de documentos a saltar
  const skip = (page - 1) * limit;
  
  // Crear un objeto de filtro
  const filter = search
    ? { title: { $regex: search, $options: 'i' } } // Filtro si hay término de búsqueda
    : {}; // Filtro vacío si no hay término de búsqueda
  
  // Buscar las noticias con el filtro, ordenar por fecha, aplicar paginación
  const news = await News.find(filter)
    .sort({ date: -1 }) // Ordenar por fecha descendente
    .skip(skip) // Saltar los documentos de las páginas anteriores
    .limit(limit); // Limitar al número de noticias por página
  res.json(news);
  } catch (error) { res.status(500).json({ message: error.message }); } };

// Obtener solo las noticias de hoy
const getNewsToday = async (req, res) => {
  const today = req.params.today;
  try {
    const newsToday = await News.find({ date: today });
    res.json(newsToday);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una noticia por su ID
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Agregar una nueva noticia
const addNews = async (req, res) => {
  try {
    const { title, type, img, body, date } = req.body;

    const newNews = new News({
      title,
      type,
      img,
      body,
      date,
    });
    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una noticia por su ID
const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una noticia por su ID
const updateNews = async (req, res) => {
  try {
    const { title, img, body, date } = req.body;

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      {
        title,
        img,
        body,
        date,
      },
      { new: true, runValidators: true }
    );
    if (!updatedNews) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }
    res.json(updatedNews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const newsControllers = {
  getNews,
  getNewsById,
  addNews,
  deleteNews,
  updateNews,
  getNewsToday,
};
