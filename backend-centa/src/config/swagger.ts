import swaggerJsdoc from "swagger-jsdoc";
import { env } from "./env";
import path from "path";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Centa Limited API",
      version: "1.0.0",
      description: "REST API documentation for Centa Limited backend",
    },
    servers: [
      {
        url: `http://localhost:${env.PORT || 3000}/api`,
        description: "Local Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
  path.join(__dirname, "../routes/*.{ts,js}"),
],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);