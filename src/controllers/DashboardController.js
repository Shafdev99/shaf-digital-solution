import View from "../helpers/View.js";
import Session from "../../auth/Session.js";
import models from "../models/ModelRegistry.js";

class DashboardController {
    static async index(req, res) {
        const [servicesCount, portfolioCount, productsCount, testimonialCount, faqCount, messageCount, unreadMessages] = await Promise.all([
            models.Service.count({ where: { status: "published" } }),
            models.Portfolio.count({ where: { status: "published" } }),
            models.ProductModel.count({ where: { status: "published" } }),
            models.Testimonial.count({ where: { status: "published" } }),
            models.Faq.count({ where: { status: "published" } }),
            models.Message.count(),
            models.Message.count({ where: { read_status: false } })
        ]);

        return View.render(res, "dashboard/index", {
            title: "Dashboard | SHAF Admin",
            layout: "layouts/dashboard",
            user: Session.user(req),
            unreadMessages,
            activeSection: req.params.section || "overview",
            pageTitle: "Overview",
            sections: [
                { key: "overview", label: "Overview" },
                { key: "landing", label: "Landing Page" },
                { key: "services", label: "Layanan" },
                { key: "portfolio", label: "Portfolio" },
                { key: "products", label: "Produk Digital" },
                { key: "testimonials", label: "Testimonial" },
                { key: "messages", label: "Pesan" },
                { key: "settings", label: "Pengaturan" }
            ],
            stats: [
                { label: "Layanan aktif", value: String(servicesCount), note: "pada landing page", type: "positive" },
                { label: "Portfolio aktif", value: String(portfolioCount), note: "project publik", type: "neutral" },
                { label: "Produk digital", value: String(productsCount), note: "tersedia di katalog", type: "positive" },
                { label: "Pesan masuk", value: String(messageCount), note: "total inbox", type: "neutral" }
            ],
            activity: [
                { title: "Landing page dipantau", detail: `FAQ: ${faqCount} · Testimoni: ${testimonialCount}`, tone: "green" },
                { title: "Item CMS aktif", detail: `Layanan ${servicesCount} · Portfolio ${portfolioCount}`, tone: "orange" },
                { title: "Inbox tersimpan", detail: `${messageCount} pesan dalam database`, tone: "green" },
                { title: "Database sinkron", detail: "MySQL aktif dan terhubung", tone: "gray" }
            ],
            quickActions: [
                { label: "Tambah portfolio", hint: "Project baru", target: "portfolio/form" },
                { label: "Tambah produk", hint: "Produk digital", target: "products/form" },
                { label: "Edit landing page", hint: "Kelola konten", target: "landing" }
            ]
        });
    }
    static async landing(req, res) {
        const [services, portfolio, products, faqs, testimonials, unreadMessages] = await Promise.all([
            models.Service.count(),
            models.Portfolio.count(),
            models.ProductModel.count(),
            models.Faq.count(),
            models.Testimonial.count(),
            models.Message.count({ where: { read_status: false } })
        ]);

        return View.render(res, "dashboard/landing", {
            title: "Landing Page | SHAF Admin",
            layout: "layouts/dashboard",
            user: Session.user(req),
            unreadMessages,
            activeSection: "landing",
            pageTitle: "Landing Page",
            counts: { services, portfolio, products, faqs, testimonials }
        });
    }

}

export default DashboardController;
