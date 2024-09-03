import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import appRouter from "./routes/index.js";
import authRouter from "./routes/authRouter.js";
import db from "./db/models/index.cjs";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api", appRouter);
app.use("/api/auth", authRouter);

app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
    console.warn(err);
});

const server = app.listen(process.env.PORT, () => {
    console.log("Server is running. Use our API on port: " + process.env.PORT);
});

db.sequelize
    .authenticate()
    .then(async () => {
        console.log("Database connection successful");

        if (process.env.INIT_DATA) {
            await db.sequelize.sync({ force: true });
            const { initialize } = await import("./db/seeders/initialize-data.js");
            await initialize(db.sequelize);
            console.log("Database initialized with data");
        }
    })
    .catch((error) => {
        console.error("Unable to connect to the database", error);

        closeApp();
    });

function closeApp() {
    server.close();
    server.on("close", () => {
        db.sequelize.close();
    });
}

export { closeApp, app };
