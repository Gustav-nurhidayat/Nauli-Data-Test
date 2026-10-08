import prisma from "../config/database";

export const createFeedback = async (
  name: string,
  email: string,
  subject: string,
  message: string
) => {
  return prisma.contact.create({
    data: {
      name,
      email,
      subject,
      message,
    },
  });
};