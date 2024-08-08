import { Router } from "express";
const router = Router();
import { newsControllers } from "../controllers/news.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { newsSchema } from "../schemas/news.schemas.js";

router.get("/news", newsControllers.getNews);

router.post(
  "/news",
  // validateSchema(newsSchema),
  newsControllers.addNews
);

router.delete("/news/:id", newsControllers.deleteNews);

router.get("/news/today/:today", newsControllers.getNewsToday);

router.get("/news/:id", newsControllers.getNewsById);

router.put("/news/:id", validateSchema(newsSchema), newsControllers.updateNews);

export default router;
