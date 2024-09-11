import { sequelize } from "../index.js";

const { runSeed } = await import("../seeders/runSeed.js");

const setupDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection successful');

        if (process.env.INIT_DATA) {
            if (process.env.INIT_DATA === "force") {
                await sequelize.sync({ force: true });

                await runSeed(sequelize);
                console.log("Database initialized with data");
            } else {
                await sequelize.sync({ alter: true });
                console.log("Database altered");
            }
        }
    } catch (error) {
        console.error('Error setting up the database:', error);
        process.exit(1);
    }
};

export default setupDatabase;
