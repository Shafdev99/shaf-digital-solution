import Session from "../../auth/Session.js";

class Auth {

    static handle(req, res, next) {

        if (!Session.check(req)) {
            req.session.redirectTo = req.originalUrl || "/dashboard";
            return res.redirect("/login");
        }

        next();
    }

}

export default Auth;