import { z } from "zod";

export const createArticleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title minimal 5 karakter")
    .max(255, "Title maksimal 255 karakter"),

  excerpt: z
    .string()
    .trim()
    .max(500, "Excerpt maksimal 500 karakter")
    .optional(),

  content: z
    .string()
    .trim()
    .min(10, "Content minimal 10 karakter"),

  thumbnail: z
    .string()
    .trim()
    .optional(),

  categoryId: z
    .string()
    .trim()
    .min(1, "Category wajib dipilih"),
});

export const updateArticleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title minimal 5 karakter")
    .max(255, "Title maksimal 255 karakter"),

  excerpt: z
    .string()
    .trim()
    .max(500, "Excerpt maksimal 500 karakter")
    .optional(),

  content: z
    .string()
    .trim()
    .min(10, "Content minimal 10 karakter"),

  thumbnail: z
    .string()
    .trim()
    .optional(),

  categoryId: z
    .string()
    .trim()
    .min(1, "Category wajib dipilih"),
});