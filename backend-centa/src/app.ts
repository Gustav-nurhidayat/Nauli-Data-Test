import express from "express";
import path from "path";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { corsOptions } from "./config/cors";
import { swaggerSpec } from "./config/swagger";
import prisma from "./config/database";
import { ArticleStatus } from "@prisma/client";
import { errorHandler } from "./middlewares/errorhandler.middleware";
import authRoutes from "./routes/auth.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import contactRoutes from "./routes/contact.routes";
import userRoutes from "./routes/users.routes";
import categoryRoutes from "./routes/category.routes";
import articleRoutes from "./routes/article.routes";
import serviceRoutes from "./routes/service.routes";
import uploadRoutes from "./routes/upload.routes";
import { apiLimiter } from "./middlewares/rateLimit.middleware";
import profileRoutes from "./routes/profile.routes";
import shareRoutes from "./routes/share.routes";
import cookieParser from "cookie-parser";
import * as authController from "./controllers/auth.controller";
import feedbackRoutes from "./routes/feedback.routes";
import labRoutes from "./routes/lab.routes";

const app = express();

app.disable("etag");

app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

app.use((_req, res, next) => {
  res.setHeader("X-Powered-By", "Node.js");
  next();
});

app.use(cookieParser());
app.use(corsOptions);
app.use(apiLimiter);

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

app.use("/api/lab", labRoutes);

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.get("/sitemap.xml", async (_req, res) => {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: ArticleStatus.PUBLISHED,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    const staticUrls = [
      {
        loc: "https://centa.ltd/",
        changefreq: "weekly",
        priority: "1.0",
      },
      {
        loc: "https://centa.ltd/approach",
        changefreq: "monthly",
        priority: "0.9",
      },
      {
        loc: "https://centa.ltd/articles",
        changefreq: "daily",
        priority: "0.9",
      },
      {
        loc: "https://centa.ltd/team",
        changefreq: "monthly",
        priority: "0.8",
      },
      {
        loc: "https://centa.ltd/team/yudi-ardata",
        changefreq: "monthly",
        priority: "0.8",
      },
      {
        loc: "https://centa.ltd/team/goestaf-nurhidayat",
        changefreq: "monthly",
        priority: "0.8",
      },
    ];

    const staticXml = staticUrls
      .map(
        (url) => `
  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
      )
      .join("");

    const articleXml = articles
      .map(
        (article) => `
  <url>
    <loc>https://centa.ltd/articles/${article.slug}</loc>
    <lastmod>${article.updatedAt.toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
      )
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${articleXml}
</urlset>`;

    res.set("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    console.error("Sitemap generation error:", error);
    res.status(500).send("Unable to generate sitemap");
  }
});

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/share", shareRoutes);
app.use("/api", feedbackRoutes);

app.post(
  "/api/verify-mfa",
  authController.verifyMfa
);

app.get("/robots.txt", (_req, res) => {
  res.type("text/plain");
  res.send(
`User-agent: *
Disallow: /api/verify-mfa
`
  );
});

const frontendDist = path.join(process.cwd(), "frontend-dist");

app.use(express.static(frontendDist));

app.get(
  /^\/(?!api(?:\/|$)|uploads(?:\/|$)|share(?:\/|$)|robots\.txt$|sitemap\.xml$).*/,
  (_req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  }
);

app.use(errorHandler);

export default app;