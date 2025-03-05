import express, { Request, Response } from "express";
import { getNews, getNewsBySlug } from "./data/newsService";

const router = express.Router();

/**
 * GET / - Laadt de homepagina
 */
router.get("/", (req: Request, res: Response): void => {
  const news = getNews();
  res.render("index", { title: "Home Page", news });
});

/**
 * GET /nieuws/:slug - Laadt de detailpagina van een nieuwsartikel
 */
router.get("/nieuws/:slug", (req: Request, res: Response): void => {
  const article = getNewsBySlug(req.params.slug);
  if (article) {
    res.render("detail", { title: article.title, article });
  } else {
    res.status(404).send("Artikel niet gevonden");
  }
});

export default router;