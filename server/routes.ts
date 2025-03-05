import express, { Request, Response } from "express";
import { getNews, getNewsBySlug, addNews } from "./data/newsService";


const router = express.Router();

// Middleware to parse form data
router.use(express.urlencoded({ extended: true }));

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
    res.status(404).render("404", { title: "404" });
  }
});

/**
 * GET /add - Laadt de pagina om een nieuwsartikel toe te voegen
 */
router.get("/add", (req: Request, res: Response): void => {
  res.render("add", { title: "Voeg Nieuws Toe" });
});

/**
 * POST /add - Verwerkt het formulier om een nieuwsartikel toe te voegen
 */
router.post("/add", (req: Request, res: Response): void => {
  const { title, content, date } = req.body;
  const newArticle = { title, content, date };
  addNews(newArticle);
  res.redirect("/");
});

// Catch-all route for handling 404 errors
router.use((req: Request, res: Response): void => {
  res.status(404).render("404", { title: "404" });
});

export default router;