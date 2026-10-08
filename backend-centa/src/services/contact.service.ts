import prisma from "../config/database";

interface ContactInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const getAllContact = async () => {
  return prisma.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getContactById = async (id: number) => {
  return prisma.contact.findUnique({
    where: {
      id,
    },
  });
};

export const createContact = async (data: ContactInput) => {
  return prisma.contact.create({
    data,
  });
};

export const updateContact = async (
  id: number,
  data: Partial<ContactInput>
) => {
  return prisma.contact.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteContact = async (id: number) => {
  return prisma.contact.delete({
    where: {
      id,
    },
  });
};
