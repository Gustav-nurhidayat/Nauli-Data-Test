import prisma from "../config/database";
import { createSlug } from "./slug";

export const generateUniqueSlug = async (
  title: string
): Promise<string> => {
  const baseSlug = createSlug(title);

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.article.findUnique({
      where: {
        slug,
      },
    });

    if (!existing) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};
