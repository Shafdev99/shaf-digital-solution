import express from "express";

import productRoutes from "./products.js";
import AuthController from "../controllers/AuthController.js";
import DashboardController from "../controllers/DashboardController.js";
import CmsController from "../controllers/CmsController.js";
import HomeController from "../controllers/HomeController.js";
import ContactController from "../controllers/ContactController.js";
import Session from "../../auth/Session.js";
import Auth from "../middleware/Auth.js";
import Upload from "../middleware/Upload.js";
import PublicController from "../controllers/PublicController.js";

const router = express.Router();

router.get("/login-test", (req, res) => {
    Session.login(req, { id: 1, name: "SHAF" });

    return res.json({
        success: true,
        message: "Login berhasil",
        user: Session.user(req)
    });
});

router.get("/user-test", (req, res) => {
    return res.json({
        authenticated: Session.check(req),
        user: Session.user(req)
    });
});

router.get("/logout-test", async (req, res) => {
    await Session.logout(req);

    return res.json({
        success: true,
        message: "Logout berhasil"
    });
});

router.get("/", HomeController.index);
router.get("/portfolio", PublicController.portfolioIndex);
router.get("/portfolio/:slug", PublicController.portfolioDetail);
router.get("/produk", PublicController.productIndex);
router.get("/produk/:slug", PublicController.productDetail);
router.post("/contact", ContactController.store);
router.get("/login", AuthController.showLogin);
router.get("/forgot-password", AuthController.showForgotPassword);
router.post("/login", AuthController.login);
router.post("/forgot-password", AuthController.forgotPassword);
router.get("/logout", AuthController.logout);
router.get("/dashboard", Auth.handle, DashboardController.index);
router.get("/dashboard/landing", Auth.handle, DashboardController.landing);
router.get("/dashboard/:section", Auth.handle, (req, res, next) => {
    if (["services", "portfolio", "products", "testimonials", "faq", "messages", "settings"].includes(req.params.section)) {
        return CmsController.index(req, res, next);
    }
    return DashboardController.index(req, res, next);
});
router.get("/dashboard/:section/form", Auth.handle, CmsController.form);
router.get("/dashboard/:section/form/:id", Auth.handle, CmsController.form);
router.post("/dashboard/:section/save", Auth.handle, Upload.single("image"), CmsController.save);
router.post("/dashboard/:section/save/:id", Auth.handle, Upload.single("image"), CmsController.save);
router.post("/dashboard/:section/delete/:id", Auth.handle, CmsController.remove);
router.post("/dashboard/messages/read/:id", Auth.handle, CmsController.toggleMessage);

router.use("/products", productRoutes);

export default router;