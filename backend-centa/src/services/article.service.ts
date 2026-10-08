import prisma from "../config/database";
import { ArticleStatus } from "@prisma/client";
import { generateUniqueSlug } from "../utils/generateUniqueSlug";

import {
  CreateArticleDto,
  UpdateArticleDto,
  ArticleQueryDto,
} from "../types/article";


const publicArticleSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  thumbnail: true,
  status: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,

  category: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },

  author: {
    select: {
      id: true,
      name: true,
    },
  },
};

const articleSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  thumbnail: true,
  status: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,

  category: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },

  author: {
  select: {
    id: true,
    name: true,
  },
},
};

export const createArticle = async (
  data: CreateArticleDto,
  authorId: string
) => {
  const category = await prisma.category.findUnique({
    where: {
      id: data.categoryId,
    },
  });

  if (!category) {
    throw new Error("Kategori tidak ditemukan");
  }

  const slug = await generateUniqueSlug(data.title);

  return await prisma.article.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      thumbnail: data.thumbnail,
      categoryId: data.categoryId,
      authorId,
    },

    select: articleSelect,
  });
};

export const getAllArticles = async (
  query: ArticleQueryDto,
  isAdmin = false
) => {
  const page = Number(query.page ?? 1);
  const limit = Number(query.limit ?? 10);

  const skip = (page - 1) * limit;

 const where = {
  ...(query.search && {
    OR: [
      {
        title: {
          contains: query.search,
          mode: "insensitive" as const,
        },
      },
      {
        excerpt: {
          contains: query.search,
          mode: "insensitive" as const,
        },
      },
      {
        content: {
          contains: query.search,
          mode: "insensitive" as const,
        },
      },
    ],
  }),

  ...(query.categoryId && {
    categoryId: query.categoryId,
  }),

  status: isAdmin
    ? query.status
    : ArticleStatus.PUBLISHED,
};

  const allowedSortFields: NonNullable<ArticleQueryDto["sortBy"]>[] = [
    "title",
    "createdAt",
    "updatedAt",
    "publishedAt",
  ];

  const sortBy = allowedSortFields.includes(
    query.sortBy as NonNullable<ArticleQueryDto["sortBy"]>
  )
    ? query.sortBy!
    : "createdAt";

  const sortOrder: "asc" | "desc" =
    query.sortOrder === "asc"
      ? "asc"
      : "desc";

  const total = await prisma.article.count({
    where,
  });

  const articles = await prisma.article.findMany({
    where,
    skip,
    take: limit,

    orderBy: {
      [sortBy]: sortOrder,
    },

select: publicArticleSelect,
  });

  return {
    data: articles,

    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getArticleById = async (
  identifier: string,
  isAdmin = false
) => {
  const article = await prisma.article.findFirst({
    where: {
      OR: [
        { id: identifier },
        { slug: identifier },
      ],

      ...(isAdmin
        ? {}
        : {
            status: ArticleStatus.PUBLISHED,
          }),
    },

    select: articleSelect,
  });

  if (!article) {
    throw new Error("Artikel tidak ditemukan");
  }

  return article;
};

export const updateArticle = async (
  id: string,
  data: UpdateArticleDto
) => {
  const article = await prisma.article.findUnique({
    where: {
      id,
    },
  });

  if (!article) {
    throw new Error("Artikel tidak ditemukan");
  }

  const category = await prisma.category.findUnique({
    where: {
      id: data.categoryId,
    },
  });

  if (!category) {
    throw new Error("Kategori tidak ditemukan");
  }

  let slug = article.slug;

  if (article.title !== data.title) {
    slug = await generateUniqueSlug(data.title);
  }

  return await prisma.article.update({
    where: {
      id,
    },

    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      thumbnail: data.thumbnail,
      categoryId: data.categoryId,
    },

    select: articleSelect,
  });
};

export const deleteArticle = async (
  id: string
) => {
  const article = await prisma.article.findUnique({
    where: {
      id,
    },
  });

  if (!article) {
    throw new Error("Artikel tidak ditemukan");
  }

  await prisma.article.delete({
    where: {
      id,
    },
  });
};

export const publishArticle = async (
  id: string
) => {
  const article = await prisma.article.findUnique({
    where: {
      id,
    },
  });

  if (!article) {
    throw new Error("Artikel tidak ditemukan");
  }

  return await prisma.article.update({
    where: {
      id,
    },

    data: {
      status: ArticleStatus.PUBLISHED,
      publishedAt: new Date(),
    },

    select: articleSelect,
  });
};

export const draftArticle = async (
  id: string
) => {
  const article = await prisma.article.findUnique({
    where: {
      id,
    },
  });

  if (!article) {
    throw new Error("Artikel tidak ditemukan");
  }

  return await prisma.article.update({
    where: {
      id,
    },

    data: {
      status: ArticleStatus.DRAFT,
      publishedAt: null,
    },

    select: articleSelect,
  });
};