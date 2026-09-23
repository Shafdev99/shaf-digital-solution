import models from "../models/ModelRegistry.js";
import { hashPassword } from "../helpers/Password.js";

async function seedDatabase() {
    const services = [
        {
            slug: "pengolahan-dokumen",
            title: "Pengolahan Dokumen",
            description: "Rapikan, susun, konversi, dan siapkan dokumen agar siap dipakai atau dipresentasikan.",
            icon: "doc",
            order: 1,
            status: "published"
        },
        {
            slug: "pengolahan-data",
            title: "Pengolahan Data",
            description: "Ubah data mentah menjadi tabel, laporan, rekap, atau informasi yang lebih mudah dipahami.",
            icon: "data",
            order: 2,
            status: "published"
        },
        {
            slug: "desain-website",
            title: "Desain & Website",
            description: "Landing page, company profile, website bisnis, dan web app yang dibuat sesuai kebutuhan nyata.",
            icon: "web",
            order: 3,
            status: "published"
        },
        {
            slug: "it-support-remote-desktop",
            title: "IT Support & Remote Desktop",
            description: "Bantu diagnosis, konfigurasi, troubleshooting, dan pendampingan teknis secara langsung atau remote.",
            icon: "it",
            order: 4,
            status: "published"
        }
    ];

    const portfolio = [
        {
            slug: "shaf-digital-solution",
            title: "SHAF Digital Solution",
            category: "WEB DESIGN",
            description: "Eksplorasi website personal brand yang menggabungkan layanan, portfolio, dan produk digital dalam satu tempat.",
            url: "https://wa.me/6285163561008",
            status: "published",
            featured: true,
            order: 1
        }
    ];

    const products = [
        {
            slug: "shaf-node-starterkit",
            name: "SHAF Node StarterKit",
            short_description: "Fondasi Node.js + Express untuk membangun aplikasi dengan struktur yang rapi dan mudah dipahami.",
            description: "StarterKit yang dipakai untuk membangun aplikasi SHAF dengan struktur backend, template, dan auth yang siap dikembangkan.",
            category: "starter-kit",
            status: "published",
            featured: true,
            order: 1
        },
        {
            slug: "dashboard-starter",
            name: "Dashboard Starter",
            short_description: "UI dashboard modular untuk kebutuhan data, CRUD, pencarian, filter, dan pagination.",
            description: "Template dashboard berbasis EJS untuk admin dengan struktur data dan pengelolaan content yang rapi.",
            category: "template",
            status: "published",
            featured: false,
            order: 2
        },
        {
            slug: "template-resource",
            name: "Template & Resource",
            short_description: "Berbagai aset digital yang dibuat supaya pekerjaan administratif dan teknis lebih cepat.",
            description: "Substansi aset dan template yang mempermudah eksekusi pekerjaan digital dan dokumentasi bisnis.",
            category: "resource",
            status: "published",
            featured: false,
            order: 3
        }
    ];

    const faqs = [
        {
            question: "Apakah bisa konsultasi dulu?",
            answer: "Bisa. Ceritakan saja masalah atau targetnya. Dari situ kita lihat kebutuhan yang paling masuk akal.",
            status: "published",
            order: 1
        },
        {
            question: "Apakah bisa untuk pekerjaan kecil?",
            answer: "Bisa. Tidak semua kebutuhan harus menjadi project besar.",
            status: "published",
            order: 2
        },
        {
            question: "Apakah website bisa dibuat custom?",
            answer: "Bisa. Struktur, tampilan, fitur, dan integrasi dapat disesuaikan dengan kebutuhan project.",
            status: "published",
            order: 3
        },
        {
            question: "Bagaimana cara memulai?",
            answer: "Hubungi SHAF melalui WhatsApp. Jelaskan kebutuhan singkat, lalu kita lanjutkan dari sana.",
            status: "published",
            order: 4
        }
    ];

    const settings = [
        { key: "site_name", value: "SHAF Digital Solution" },
        { key: "whatsapp_url", value: "https://wa.me/6285163561008" },
        { key: "contact_email", value: "hello@shaf.id" }
    ];


    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const recoveryCode = process.env.ADMIN_RECOVERY_CODE || "SHAF-RESET-2026";
    const existingAdmin = await models.User.findOne({ where: { username: adminUsername } });

    if (!existingAdmin) {
        await models.User.create({
            username: adminUsername,
            password_hash: hashPassword(adminPassword),
            recovery_code_hash: hashPassword(recoveryCode),
            name: "Admin SHAF"
        });
    }

    await Promise.all([
        ...services.map((service) =>
            models.Service.findOrCreate({
                where: { slug: service.slug },
                defaults: service
            })
        ),
        ...portfolio.map((item) =>
            models.Portfolio.findOrCreate({
                where: { slug: item.slug },
                defaults: item
            })
        ),
        ...products.map((item) =>
            models.ProductModel.findOrCreate({
                where: { slug: item.slug },
                defaults: item
            })
        ),
        ...faqs.map((item) =>
            models.Faq.findOrCreate({
                where: { question: item.question },
                defaults: item
            })
        ),
        ...settings.map((setting) =>
            models.Setting.findOrCreate({
                where: { key: setting.key },
                defaults: setting
            })
        )
    ]);
}

export default seedDatabase;