import express from "express";
import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import YAML from "yamljs";
import cors from "cors"; // 1. Added CORS import
import { protect } from "./middleware/auth.js";
import adminRoutes from "./routes/admin/route.js";
import authRoutes from "./routes/auth/route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerPath = path.resolve(__dirname, "swagger.yaml");

let swaggerDocument;
if (fs.existsSync(swaggerPath)) {
    swaggerDocument = YAML.load(swaggerPath);
}

const createApp = () => {
    const app = express();

    // 2. Enable CORS first so the global URL works in browsers
    app.use(cors()); 
    app.use(express.json());

    // 3. Public Routes (MUST be above app.use(protect))
    app.get("/", (_req, res) => {
        res.send("Hello world");
    });

    if (swaggerDocument) {
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    app.use("/api/auth", authRoutes);

    // 4. Protected Routes Middleware
    // Everything BELOW this line requires a token
    app.use("/api/admin", protect, adminRoutes); 

    // 5. Catch-all for 404s (Moved outside of protection)
    app.all("*", (req, res) => {
        res.status(404).json({
            status: "fail",
            message: `Can't find ${req.originalUrl} on this server!`
        });
    });

    return app;
};

export default createApp;