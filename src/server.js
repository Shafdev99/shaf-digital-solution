import "dotenv/config";
import app from "./app.js";
import config from "./config/app.js";
import sequelize from "./database/database.js";
import seedDatabase from "./database/seed.js";

async function startServer() {
    try {
        await sequelize.authenticate();

        await sequelize.sync({ alter: true });
        await seedDatabase();

        console.log("Database berhasil terhubung");

        app.listen(config.port, function () {
            console.log(
                `${config.name} berjalan di http://127.0.0.1:${config.port}`
            );
        });

    } catch (error) {
        console.error(
            "Database gagal terhubung:",
            error.message
        );
    }
}

startServer();