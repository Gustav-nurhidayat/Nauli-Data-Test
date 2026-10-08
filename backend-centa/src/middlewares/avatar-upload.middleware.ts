import multer from "multer";
import fs from "fs";
import path from "path";

const uploadPath = path.join(
  process.cwd(),
  "uploads",
  "avatars"
);

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },

  filename: (_req, file, cb) => {
    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1_000_000_000) +
      extension;

    cb(null, uniqueName);
  },
});

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const fileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  cb
) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        "Foto profil harus JPG, PNG, atau WEBP."
      )
    );
  }

  cb(null, true);
};

export const avatarUpload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});