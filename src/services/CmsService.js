import { Op } from "@sequelize/core";
import models from "../models/ModelRegistry.js";

const resources = {
    services: {
        model: models.Service,
        label: "Layanan",
        fields: ["title", "slug", "description", "icon", "order", "status"],
        columns: ["title", "slug", "status", "order"]
    },
    portfolio: {
        model: models.Portfolio,
        label: "Portfolio",
        fields: ["title", "slug", "category", "description", "image", "url", "status", "featured", "order"],
        columns: ["title", "category", "status", "featured", "order"]
    },
    products: {
        model: models.ProductModel,
        label: "Produk Digital",
        fields: ["name", "slug", "short_description", "description", "image", "category", "status", "featured", "order"],
        columns: ["name", "category", "status", "order"]
    },
    testimonials: {
        model: models.Testimonial,
        label: "Testimonial",
        fields: ["name", "role", "quote", "image", "status", "order"],
        columns: ["name", "role", "status", "order"]
    },
    faq: {
        model: models.Faq,
        label: "FAQ",
        fields: ["question", "answer", "status", "order"],
        columns: ["question", "status", "order"]
    },
    messages: {
        model: models.Message,
        label: "Pesan",
        fields: ["name", "email", "subject", "message", "read_status"],
        columns: ["name", "email", "subject", "read_status", "createdAt"]
    },
    settings: {
        model: models.Setting,
        label: "Pengaturan",
        fields: ["key", "value"],
        columns: ["key", "value"]
    }
};

function slugify(value) {
    return String(value || "")
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function normalizeValue(field, value) {
    if (["order"].includes(field)) return Number(value || 0);
    if (["featured", "read_status"].includes(field)) return value === "on" || value === "true" || value === "1";
    return typeof value === "string" ? value.trim() : value;
}

class CmsService {
    static resource(key) {
        const resource = resources[key];
        if (!resource) throw new Error("CMS resource tidak ditemukan");
        return resource;
    }

    static async list(key, query = {}) {
        const resource = this.resource(key);
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = [10, 25, 50].includes(Number(query.limit)) ? Number(query.limit) : 10;
        const search = String(query.search || "").trim();
        const where = {};
        const searchable = resource.fields.filter((field) =>
            ["title", "name", "slug", "category", "email", "subject", "question"].includes(field)
        );

        if (search && searchable.length) {
            where[Op.or] = searchable.map((field) => ({ [field]: { [Op.like]: `%${search}%` } }));
        }
        if (query.status && resource.fields.includes("status")) where.status = query.status;
        if (query.featured && resource.fields.includes("featured")) where.featured = query.featured === "true";
        if (query.read_status && resource.fields.includes("read_status")) where.read_status = query.read_status === "read";

        const { rows, count } = await resource.model.findAndCountAll({
            where,
            limit,
            offset: (page - 1) * limit,
            order: [[resource.fields.includes("order") ? "order" : "createdAt", "ASC"], ["id", "ASC"]]
        });

        return {
            rows,
            count,
            page,
            limit,
            pages: Math.max(Math.ceil(count / limit), 1),
            resource
        };
    }

    static async find(key, id) {
        const resource = this.resource(key);
        return resource.model.findByPk(id);
    }

    static async ensureUniqueSlug(model, rawSlug, id) {
        let base = slugify(rawSlug) || `item-${Date.now()}`;
        let slug = base;
        let counter = 2;

        while (true) {
            const where = id
                ? { slug, id: { [Op.ne]: id } }
                : { slug };

            const existing = await model.findOne({ where });
            if (!existing) return slug;

            slug = `${base}-${counter++}`;
        }
    }

    static async nextOrder(model) {
        const max = await model.max("order");
        return Number.isFinite(Number(max)) ? Number(max) + 1 : 1;
    }

    static async normalizeOrder(model, desiredOrder, id) {
        const hasOrder = Number.isFinite(Number(desiredOrder));
        if (!hasOrder) return this.nextOrder(model);

        const order = Math.max(Number(desiredOrder), 1);
        const where = id ? { id: { [Op.ne]: id }, order: { [Op.gte]: order } } : { order: { [Op.gte]: order } };

        // Shift existing items so every order position remains unique.
        const records = await model.findAll({
            where,
            order: [["order", "DESC"], ["id", "DESC"]]
        });

        for (const record of records) {
            await record.update({ order: Number(record.order) + 1 });
        }

        return order;
    }

    static async save(key, id, input) {
        const resource = this.resource(key);
        const record = id ? await resource.model.findByPk(id) : null;

        if (id && !record) throw new Error("Data tidak ditemukan");

        const data = {};

        resource.fields.forEach((field) => {
            if (input[field] !== undefined) data[field] = normalizeValue(field, input[field]);
        });

        ["featured", "read_status"].forEach((field) => {
            if (resource.fields.includes(field) && input[field] === undefined) data[field] = false;
        });

        if (resource.fields.includes("slug")) {
            const source = data.slug || data.title || data.name;
            data.slug = await this.ensureUniqueSlug(resource.model, source, id ? Number(id) : undefined);
        }

        if (resource.fields.includes("order")) {
            const requestedOrder = data.order;
            const sameOrder = record && Number(record.order) === Number(requestedOrder);

            if (sameOrder) {
                data.order = record.order;
            } else {
                data.order = await this.normalizeOrder(
                    resource.model,
                    requestedOrder,
                    id ? Number(id) : undefined
                );
            }
        }

        if (record) {
            await record.update(data);
            return record;
        }

        return resource.model.create(data);
    }

    static async remove(key, id) {
        const resource = this.resource(key);
        const record = await resource.model.findByPk(id);
        if (!record) throw new Error("Data tidak ditemukan");
        await record.destroy();
    }

    static async toggleRead(id) {
        const record = await models.Message.findByPk(id);
        if (!record) throw new Error("Pesan tidak ditemukan");
        await record.update({ read_status: !record.read_status });
        return record;
    }

    static definitions() {
        return resources;
    }
}

export default CmsService;
