import { ArticleStatus } from "@prisma/client";
import prisma from "../config/database";

export const getDashboard = async () => {
  const [
    totalUsers,
    totalContacts,
    totalCategories,
    totalArticles,
    publishedArticles,
    draftArticles,
    totalServices,
    latestContacts,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.contact.count(),

    prisma.category.count(),

    prisma.article.count(),

    prisma.article.count({
      where: {
        status: ArticleStatus.PUBLISHED,
      },
    }),

    prisma.article.count({
      where: {
        status: ArticleStatus.DRAFT,
      },
    }),

    prisma.service.count(),

    prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    statistics: {
      totalUsers,
      totalContacts,
      totalCategories,
      totalArticles,
      publishedArticles,
      draftArticles,
      totalServices,
    },
    latestContacts,
  };
};

export const getLatestFeedback = async () => {
  return prisma.contact.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
};