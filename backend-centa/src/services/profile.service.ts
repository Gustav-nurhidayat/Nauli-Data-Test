import prisma from "../config/database";
import bcrypt from "bcrypt";

export const getProfile = async (
  userId: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  return user;
};


export const updateProfile = async (
  userId: string,
  name: string,
  email: string
) => {

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User tidak ditemukan");
  }


  const existingEmail =
    await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: userId,
        },
      },
    });

  if (existingEmail) {
    throw new Error(
      "Email sudah digunakan"
    );
  }


  const updated =
    await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        name,
        email,
      },

      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });


  return updated;
};


export const updatePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {

  const user =
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

  if (!user) {
    throw new Error(
      "User tidak ditemukan"
    );
  }


  const valid =
    await bcrypt.compare(
      currentPassword,
      user.password
    );

  if (!valid) {
    throw new Error(
      "Password saat ini salah"
    );
  }


  if (
    newPassword.length < 8
  ) {
    throw new Error(
      "Password baru minimal 8 karakter"
    );
  }


  const hashedPassword =
    await bcrypt.hash(
      newPassword,
      10
    );


  await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      password: hashedPassword,
    },
  });


  return {
    message:
      "Password berhasil diubah",
  };
};