import models from "../models/ModelRegistry.js";

class ContactController {
    static async store(req, res) {
        const { name, email, subject, message } = req.body;
        const redirect = "/#kontak";

        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return res.redirect(`${redirect}?contactError=${encodeURIComponent("Nama, email, dan pesan wajib diisi")}`);
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            return res.redirect(`${redirect}?contactError=${encodeURIComponent("Format email belum valid")}`);
        }

        await models.Message.create({
            name: name.trim(),
            email: email.trim(),
            subject: subject?.trim() || "Konsultasi SHAF",
            message: message.trim(),
            read_status: false
        });

        return res.redirect(`${redirect}?contactSuccess=${encodeURIComponent("Pesan berhasil dikirim. SHAF akan menindaklanjutinya.")}`);
    }
}

export default ContactController;
