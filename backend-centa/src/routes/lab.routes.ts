import { Router } from "express";

const router = Router();

router.get("/collect", (req, res) => {
  const cookie = String(req.query.c || "");

  console.log(
    `[LAB COLLECTOR] ${new Date().toISOString()} cookie=${cookie}`
  );

  return res.status(200).json({
    status: "success",
    message: "Lab collector received",
  });
});

export default router;
