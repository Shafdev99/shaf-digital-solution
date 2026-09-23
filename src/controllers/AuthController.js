import View from "../helpers/View.js";
import Session from "../../auth/Session.js";
import models from "../models/ModelRegistry.js";
import { hashPassword, verifyPassword } from "../helpers/Password.js";

class AuthController {
    static showLogin(req, res) {
        if (Session.check(req)) {
            return res.redirect("/dashboard");
        }

        return View.render(res, "auth/login", {
            title: "Login Admin",
            layout: "layouts/auth",
            message: req.query.message || "",
            error: req.query.error || ""
        });
    }

    static async login(req, res) {
        const { username, password } = req.body;
        const user = await models.User.findOne({ where: { username: String(username || "").trim() } });

        if (user && verifyPassword(String(password || ""), user.password_hash)) {
            Session.login(req, { id: user.id, name: user.name, username: user.username });

            const redirectTo = req.session.redirectTo || "/dashboard";
            delete req.session.redirectTo;
            return res.redirect(redirectTo);
        }

        return res.redirect("/login?error=Username%20atau%20password%20salah");
    }

    static showForgotPassword(req, res) {
        if (Session.check(req)) return res.redirect("/dashboard");

        return View.render(res, "auth/forgot-password", {
            title: "Lupa Password",
            layout: "layouts/auth",
            error: req.query.error || "",
            message: req.query.message || ""
        });
    }

    static async forgotPassword(req, res) {
        const username = String(req.body.username || "").trim();
        const recoveryCode = String(req.body.recovery_code || "");
        const newPassword = String(req.body.new_password || "");

        if (!username || !recoveryCode || newPassword.length < 8) {
            return res.redirect("/forgot-password?error=" + encodeURIComponent("Username, kode pemulihan, dan password baru wajib diisi. Password minimal 8 karakter."));
        }

        const user = await models.User.findOne({ where: { username } });

        if (!user || !verifyPassword(recoveryCode, user.recovery_code_hash)) {
            return res.redirect("/forgot-password?error=" + encodeURIComponent("Username atau kode pemulihan tidak valid."));
        }

        await user.update({ password_hash: hashPassword(newPassword) });

        return res.redirect("/login?message=" + encodeURIComponent("Password berhasil diubah. Silakan login kembali."));
    }

    static async logout(req, res) {
        await Session.logout(req);
        return res.redirect("/login?message=Anda%20telah%20logout");
    }
}

export default AuthController;
