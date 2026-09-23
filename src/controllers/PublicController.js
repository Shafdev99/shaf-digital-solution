import View from "../helpers/View.js";
import models from "../models/ModelRegistry.js";

class PublicController {
    static async portfolioIndex(req, res) {
        const records = await models.Portfolio.findAll({
            where: { status: "published" },
            order: [["featured", "DESC"], ["order", "ASC"], ["id", "ASC"]]
        });

        return View.render(res, "portfolio/index", {
            title: "Portfolio | SHAF Digital Solution",
            layout: "layouts/app",
            portfolio: records
        });
    }

    static async portfolioDetail(req, res) {
        const record = await models.Portfolio.findOne({
            where: { slug: req.params.slug, status: "published" }
        });

        if (!record) return res.status(404).render("portfolio/detail", {
            title: "Portfolio tidak ditemukan | SHAF",
            layout: "layouts/app",
            portfolio: null
        });

        return View.render(res, "portfolio/detail", {
            title: `${record.title} | Portfolio SHAF`,
            layout: "layouts/app",
            portfolio: record
        });
    }

    static async productIndex(req, res) {
        const records = await models.ProductModel.findAll({
            where: { status: "published" },
            order: [["featured", "DESC"], ["order", "ASC"], ["id", "ASC"]]
        });

        return View.render(res, "products/index", {
            title: "Produk Digital | SHAF Digital Solution",
            layout: "layouts/app",
            products: records
        });
    }

    static async productDetail(req, res) {
        const record = await models.ProductModel.findOne({
            where: { slug: req.params.slug, status: "published" }
        });

        if (!record) {
            res.status(404);
            return View.render(res, "products/detail", {
                title: "Produk tidak ditemukan | SHAF",
                layout: "layouts/app",
                product: null
            });
        }

        return View.render(res, "products/detail", {
            title: `${record.name} | Produk SHAF`,
            layout: "layouts/app",
            product: record
        });
    }
}

export default PublicController;
