import express from "express";
import { protect } from "./middleware/auth.js";
import adminRoutes from "./routes/admin/route.js";
import authRoutes from "./routes/auth/route.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LMS Backend API",
      version: "1.0.0",
      description: "API documentation for the Learning Management System",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
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
    security: [{ bearerAuth: [] }],
  },

  apis: ["./src/routes/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const createApp = () => {
  const app = express();
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.send("Hello world");
  });

   app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


  app.use("/api/auth", authRoutes);

  /*
   * all routes before this middleware are unprotected
   * all routes after this middleware are protected
   */
  app.use(protect);

  app.use("/api/admin", adminRoutes);

  return app;
};

export default createApp;
