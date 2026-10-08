import { Role } from "@prisma/client";
import prisma from "../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

const JWT_SECRET = env.JWT_SECRET;

export const loginAdmin = async (
  email: string,
  password: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Email atau password salah");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Email atau password salah");
  }

  if (
    user.role !== Role.ADMIN &&
    user.role !== Role.SUPER_ADMIN
  ) {
    throw new Error("Akses ditolak");
  }

  const { password: _, ...safeUser } = user;

  return {
    user: safeUser,
    mfaRequired: true,
  };
};


/**
 * Membuat session sementara sebelum MFA.
 */
export const createPreMfaSession = (
  userId: string,
  email: string,
  role: string
) => {
  return jwt.sign(
    {
      type: "pre_mfa",
      id: userId,
      email,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: "10m",
    }
  );
};


/**
 * Membuat session admin setelah MFA.
 *
 * Sengaja menggunakan prefix adm_sess
 * karena merupakan requirement CTF.
 */
export const createAdminSession = (
  userId: string,
  email: string,
  role: string
) => {
  return jwt.sign(
    {
      type: "admin",
      id: userId,
      email,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};


export const verifyAdminSession = (token: string) => {
  const decoded = jwt.verify(
    token,
    JWT_SECRET
  ) as {
    type?: string;
    id: string;
    email: string;
    role: string;
  };

  if (decoded.type !== "admin") {
    throw new Error("Invalid admin session");
  }

  return decoded;
};


export const getProfileAdmin = async (
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
      role: true,
      avatar: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error("Admin tidak ditemukan");
  }

  return user;
};