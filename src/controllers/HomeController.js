import View from "../helpers/View.js";
import models from "../models/ModelRegistry.js";

class HomeController {
    static async index(req, res) {
        const [services, portfolio, products, faqs, testimonials, settings] = await Promise.all([
            models.Service.findAll({
                where: { status: "published" },
                order: [["order", "ASC"], ["id", "ASC"]]
            }),
            models.Portfolio.findAll({
                where: { status: "published" },
                order: [["featured", "DESC"], ["order", "ASC"], ["id", "ASC"]]
            }),
            models.ProductModel.findAll({
                where: { status: "published" },
                order: [["featured", "DESC"], ["order", "ASC"], ["id", "ASC"]]
            }),
            models.Faq.findAll({
                where: { status: "published" },
                order: [["order", "ASC"], ["id", "ASC"]]
            }),
            models.Testimonial.findAll({
                where: { status: "published" },
                order: [["order", "ASC"], ["id", "ASC"]]
            }),
            models.Setting.findAll().catch(() => [])
        ]);

        const siteSettings = Object.fromEntries(settings.map((setting) => [setting.key, setting.value]));
        const whatsappUrl = siteSettings.whatsapp_url || "https://wa.me/6285163561008";

        const serviceData = services.map((service, index) => ({
            number: String(index + 1).padStart(2, "0"),
            title: service.title,
            description: service.description,
            slug: service.slug,
            tags: service.icon ? service.icon.split(",").map((tag) => tag.trim()).filter(Boolean) : []
        }));

        const portfolioData = portfolio.map((item) => ({
            category: item.category,
            year: item.createdAt ? new Date(item.createdAt).getFullYear() : "",
            id: item.id,
            slug: item.slug,
            title: item.title,
            description: item.description,
            image: item.image,
            url: item.url,
            featured: item.featured
        }));

        const productData = products.map((item, index) => ({
            name: item.name,
            slug: item.slug,
            tag: item.category ? item.category.toUpperCase() : "DIGITAL PRODUCT",
            number: String(index + 1).padStart(2, "0"),
            description: item.short_description || item.description || "Produk digital yang siap digunakan.",
            image: item.image,
            featured: item.featured
        }));

        const faqData = faqs.map((item) => ({
            question: item.question,
            answer: item.answer
        }));

        const testimonialData = testimonials.map((item) => ({
            id: item.id,
            name: item.name,
            role: item.role,
            quote: item.quote,
            image: item.image
        }));

        return View.render(res, "home/index", {
            title: "SHAF Digital Solution",
            page: "home",
            headline: "Ide yang masih berantakan, kita bikin jadi beres.",
            subheadline: "Dari dokumen dan data sampai website dan dukungan IT. Satu partner untuk menyelesaikan pekerjaan digital yang benar-benar dibutuhkan.",
            ctaPrimary: "Konsultasi gratis",
            ctaSecondary: "Lihat yang bisa dikerjakan",
            whatsappUrl,
            contactSuccess: req.query.contactSuccess || "",
            contactError: req.query.contactError || "",
            query: req.query,
            services: serviceData,
            portfolio: portfolioData,
            featuredPortfolio: portfolioData.filter((item) => item.featured),
            products: productData,
            process: [
                { number: "01", title: "Ceritakan kebutuhannya", description: "Kita ngobrol tentang tujuan, masalah, dan kondisi yang sedang dihadapi." },
                { number: "02", title: "Susun solusi", description: "Kita tentukan ruang lingkup, cara kerja, prioritas, dan estimasi yang masuk akal." },
                { number: "03", title: "Kerjakan bersama", description: "Progress dikomunikasikan secara berkala supaya tidak ada kejutan di akhir." },
                { number: "04", title: "Serahkan dengan rapi", description: "Hasil akhir, file, akses, atau panduan disiapkan agar bisa langsung digunakan." }
            ],
            facts: [
                { number: "01", title: "Praktis", description: "Fokus pada solusi yang benar-benar bisa digunakan." },
                { number: "02", title: "Fleksibel", description: "Ruang lingkup menyesuaikan kebutuhan dan kondisi." },
                { number: "03", title: "Langsung", description: "Komunikasi tanpa rantai yang panjang." },
                { number: "04", title: "Bertumbuh", description: "Solusi disiapkan agar bisa dikembangkan berikutnya." }
            ],
            faqs: faqData,
            testimonials: testimonialData,
            info: {
                brandName: "SHAF Digital Solution",
                location: "Indonesia",
                year: 2026
            }
        });
    }
}

export default HomeController;
