import { Router } from "express";
import prisma from "../config/database";

const router = Router();

router.get("/articles/:slug", async (req, res) => {
  try {
    const article = await prisma.article.findUnique({
      where: {
        slug: req.params.slug,
      },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        thumbnail: true,
      },
    });

    if (!article) {
      return res.status(404).send("Article not found");
    }

    const image = article.thumbnail
      ? `https://centa.ltd${article.thumbnail}`
      : "https://centa.ltd/og-image.png";

    const userAgent = req.headers["user-agent"] || "";

    const crawler =
      userAgent.includes("Googlebot") ||
      userAgent.includes("facebookexternalhit") ||
      userAgent.includes("WhatsApp") ||
      userAgent.includes("Twitterbot") ||
      userAgent.includes("LinkedInBot");

    // Human visitor -> redirect to React frontend
    if (!crawler) {
      return res.redirect(`/articles/${article.slug}`);
    }

    // Search engine / social media crawler
    return res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">

  <title>${article.title}</title>

  <meta name="description" content="${article.excerpt ?? ""}">

  <link rel="canonical" href="https://centa.ltd/articles/${article.slug}">

  <meta property="og:title" content="${article.title}">
  <meta property="og:description" content="${article.excerpt ?? ""}">
  <meta property="og:type" content="article">
  <meta property="og:image" content="${image}">
  <meta property="og:url" content="https://centa.ltd/articles/${article.slug}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${article.title}">
  <meta name="twitter:description" content="${article.excerpt ?? ""}">
  <meta name="twitter:image" content="${image}">
</head>

<body>
  <h1>${article.title}</h1>
  <p>${article.excerpt ?? ""}</p>
</body>
</html>
`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;