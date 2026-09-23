import "dotenv/config";
import express from "express";
import session from "express-session";

import webRoutes from "./routes/web.js";
import ErrorHandler from "./exceptions/ErrorHandler.js";
import Logger from "./middleware/Logger.js";
import ViewHelper from "./helpers/ViewHelper.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || "shaf-development-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax"
    }
}));

app.set("views", "./views");
app.set("view engine", "ejs");
app.locals.url = ViewHelper.url;
app.use(express.static("./public"));
app.use("/", webRoutes);
app.use(Logger.handle);
app.use(ErrorHandler.handle);

export default app;