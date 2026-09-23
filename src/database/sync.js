import sequelize from "./database.js";
import Product from "../models/Product.js";
import Service from "../models/Service.js";
import Portfolio from "../models/Portfolio.js";
import ProductModel from "../models/ProductModel.js";
import Faq from "../models/Faq.js";
import Testimonial from "../models/Testimonial.js";
import Message from "../models/Message.js";

async function syncDatabase() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log("Database sync complete");
    } catch (error) {
        console.error("Database sync failed:", error.message);
        process.exitCode = 1;
    } finally {
        await sequelize.close();
    }
}

syncDatabase();
