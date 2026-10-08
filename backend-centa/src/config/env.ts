import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || "3075",
  DATABASE_URL: process.env.DATABASE_URL || "",
 JWT_SECRET: process.env.JWT_SECRET || "Centa0895#",
};