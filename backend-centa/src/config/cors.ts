import cors from "cors";

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
];

export const corsOptions = cors({
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    const error = new Error("Not allowed by CORS") as Error & {
      statusCode?: number;
    };

    error.statusCode = 403;

    return callback(error);
  },

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],

  credentials: true,
});