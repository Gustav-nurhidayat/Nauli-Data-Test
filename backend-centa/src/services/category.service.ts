import prisma from "../config/database";
import { createSlug } from "../utils/slug";




export const createCategory = async (name: string) => {
  name = name.trim();

  if (!name) {
    throw new Error("Nama kategori wajib diisi");
  }

  const existingCategory = await prisma.category.findUnique({
    where: { name },
  });

  if (existingCategory) {
    throw new Error("Kategori sudah ada");
  }

  const slug = createSlug(name);

  return prisma.category.create({
    data: {
      name,
      slug,
    },
  });
};



export const getAllCategories = async (
  page = 1,
  limit = 10,
  search?: string
) => {

  const skip = (page - 1) * limit;

  const where = search
    ? {
        name: {
          contains: search,
          mode: "insensitive" as const,
        },
      }
    : {};

  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    }),

    prisma.category.count({
      where,
    }),
  ]);

  return {
    data: categories,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getCategoryById = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    throw new Error("Kategori tidak ditemukan");
  }

  return category;
};

export const updateCategory = async (
  id: string,
  name: string
) => {
  name = name.trim();

  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new Error("Kategori tidak ditemukan");
  }

  const duplicate = await prisma.category.findFirst({
    where: {
      name,
      NOT: {
        id,
      },
    },
  });

  if (duplicate) {
    throw new Error("Nama kategori sudah digunakan");
  }

  const slug = createSlug(name);

  return prisma.category.update({
    where: { id },
    data: {
      name,
      slug,
    },
  });
};

export const deleteCategory = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    throw new Error("Kategori tidak ditemukan");
  }

  await prisma.category.delete({
    where: {
      id,
    },
  });

  return;
};