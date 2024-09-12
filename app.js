import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import appRouter from "./routes/index.js";
import { generateOpenApi } from "./openApiGenerator.js";
import swaggerUi from "swagger-ui-express";
import setupDatabase from "./db/scripts/setupDatabase.js";

const { PORT } = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api", appRouter);

try {
    const openApiSpec = generateOpenApi(app);
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));
} catch (error) {
    console.error("Error generating OpenAPI specification", error);
}

app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
    console.warn(err);
});

app.listen(PORT, async () => {
    await setupDatabase();

    console.log(`Server is running. Use our API on port: ${PORT}`);
});
