import {
  Request,
  Response,
} from "express";

import fs from "fs";
import path from "path";

import prisma from "../config/database";

import * as profileService
  from "../services/profile.service";

export const getProfile = async (
  req: Request,
  res: Response
) => {

  try {

    const user = req.user as {
      id: string;
    };


    const profile =
      await profileService.getProfile(
        user.id
      );


    return res.status(200).json({
      status: "success",
      data: profile,
    });

  } catch (error: any) {

    return res.status(404).json({
      status: "error",
      message: error.message,
    });

  }
};


export const updateProfile = async (
  req: Request,
  res: Response
) => {

  try {

    const user = req.user as {
      id: string;
    };


    const {
      name,
      email,
    } = req.body;


    if (
      !name?.trim() ||
      !email?.trim()
    ) {
      return res.status(400).json({
        status: "error",
        message:
          "Nama dan email wajib diisi.",
      });
    }


    const profile =
      await profileService.updateProfile(
        user.id,
        name.trim(),
        email.trim()
      );


    return res.status(200).json({
      status: "success",
      message:
        "Profil berhasil diperbarui.",
      data: profile,
    });

  } catch (error: any) {

    return res.status(400).json({
      status: "error",
      message: error.message,
    });

  }
};


export const updatePassword = async (
  req: Request,
  res: Response
) => {

  try {

    const user = req.user as {
      id: string;
    };


    const {
      currentPassword,
      newPassword,
    } = req.body;


    if (
      !currentPassword ||
      !newPassword
    ) {
      return res.status(400).json({
        status: "error",
        message:
          "Password saat ini dan password baru wajib diisi.",
      });
    }


    const result =
      await profileService.updatePassword(
        user.id,
        currentPassword,
        newPassword
      );


    return res.status(200).json({
      status: "success",
      message: result.message,
    });

  } catch (error: any) {

    return res.status(400).json({
      status: "error",
      message: error.message,
    });

  }

};


export const uploadAvatar = async (
  req: Request,
  res: Response
) => {
  try {
    const user = req.user as {
      id: string;
    };

    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "Foto profil wajib diupload.",
      });
    }

    const avatarUrl =
      `/uploads/avatars/${req.file.filename}`;

    const currentUser =
      await profileService.getProfile(user.id);

    // Hapus avatar lama
    if (currentUser.avatar) {
      const oldPath = path.join(
        process.cwd(),
        currentUser.avatar
      );

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const updated =
      await prisma.user.update({
        where: {
          id: user.id,
        },

        data: {
          avatar: avatarUrl,
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

    return res.status(200).json({
      status: "success",
      message:
        "Foto profil berhasil diperbarui.",
      data: updated,
    });

  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message:
        error.message ||
        "Gagal mengupload foto profil.",
    });
  }
};
