import multer from "multer";
import fs from "fs";
import path from "path";

// Folder upload
const uploadPath = path.join(process.cwd(), "uploads");

// Buat folder jika belum ada
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },

  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1_000_000_000) +
      extension.toLowerCase();

    cb(null, uniqueName);
  },
});

// Tipe file yang diizinkan
const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

// Filter file
const fileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  cb
) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        "File harus berupa gambar JPG, JPEG, PNG, atau WEBP."
      )
    );
  }

  cb(null, true);
};

// Export middleware upload
export const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});