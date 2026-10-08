import { Request, Response } from "express";

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "File gambar wajib diupload.",
      });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    return res.status(201).json({
      status: "success",
      message: "Upload gambar berhasil.",
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: fileUrl,
      },
    });
  } catch (error) {
    console.error("Upload Error:", error);

    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan saat upload gambar.",
    });
  }
};