import View from "../helpers/View.js";
import CmsService from "../services/CmsService.js";
import Session from "../../auth/Session.js";
import models from "../models/ModelRegistry.js";

const titles = {
    landing: "Landing Page",
    services: "Layanan",
    portfolio: "Portfolio",
    products: "Produk Digital",
    testimonials: "Testimonial",
    faq: "FAQ",
    messages: "Pesan",
    settings: "Pengaturan"
};

class CmsController {
    static async index(req, res) {
        const key = req.params.section === "landing" ? "services" : req.params.section;
        const resource = CmsService.resource(key);
        const [result, unreadMessages] = await Promise.all([CmsService.list(key, req.query), models.Message.count({ where: { read_status: false } })]);

        return View.render(res, "dashboard/manage", {
            title: `${resource.label} | SHAF Admin`,
            layout: "layouts/dashboard",
            user: Session.user(req),
            unreadMessages,
            activeSection: req.params.section,
            pageTitle: titles[req.params.section] || resource.label,
            resourceKey: key,
            resource,
            records: result.rows,
            count: result.count,
            page: result.page,
            limit: result.limit,
            pages: result.pages,
            query: req.query,
            error: req.query.error || "",
            success: req.query.success || ""
        });
    }

    static async form(req, res) {
        const key = req.params.section;
        const resource = CmsService.resource(key);
        const record = req.params.id ? await CmsService.find(key, req.params.id) : null;
        const unreadMessages = await models.Message.count({ where: { read_status: false } });

        if (req.params.id && !record) return res.redirect(`/dashboard/${key}?error=Data%20tidak%20ditemukan`);

        return View.render(res, "dashboard/form", {
            title: `${record ? "Edit" : "Tambah"} ${resource.label} | SHAF Admin`,
            layout: "layouts/dashboard",
            user: Session.user(req),
            unreadMessages,
            activeSection: key,
            pageTitle: `${record ? "Edit" : "Tambah"} ${resource.label}`,
            resourceKey: key,
            resource,
            record,
            error: ""
        });
    }

    static async save(req, res) {
        const key = req.params.section;
        try {
            const input = req.file
                ? { ...req.body, image: `/images/uploads/${req.file.filename}` }
                : req.body;
            await CmsService.save(key, req.params.id, input);
            return res.redirect(`/dashboard/${key}?success=${encodeURIComponent("Data berhasil disimpan")}`);
        } catch (error) {
            return res.redirect(`/dashboard/${key}/form${req.params.id ? `/${req.params.id}` : ""}?error=${encodeURIComponent(error.message)}`);
        }
    }

    static async remove(req, res) {
        const key = req.params.section;
        try {
            await CmsService.remove(key, req.params.id);
            return res.redirect(`/dashboard/${key}?success=${encodeURIComponent("Data berhasil dihapus")}`);
        } catch (error) {
            return res.redirect(`/dashboard/${key}?error=${encodeURIComponent(error.message)}`);
        }
    }

    static async toggleMessage(req, res) {
        try {
            await CmsService.toggleRead(req.params.id);
            return res.redirect(`/dashboard/messages?success=${encodeURIComponent("Status pesan diperbarui")}`);
        } catch (error) {
            return res.redirect(`/dashboard/messages?error=${encodeURIComponent(error.message)}`);
        }
    }
}

export default CmsController;
