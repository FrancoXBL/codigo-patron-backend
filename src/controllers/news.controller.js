import News from "../models/news.model.js";

const getNews = async (req, res) => {
  try {
    const news = await News.find(filter)
      .sort({ date: -1 })
      .limit(50); // Limitar al número de noticias por página

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

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
