import fs from "node:fs";
import path from "node:path";
import multer from "multer";

const uploadDirectory = path.resolve("public/images/uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
    destination: uploadDirectory,
    filename: (req, file, callback) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const safeName = path.basename(file.originalname, extension).replace(/[^a-z0-9]+/gi, "-").toLowerCase();
        callback(null, `${Date.now()}-${safeName || "image"}${extension}`);
    }
});

const fileFilter = (req, file, callback) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    callback(null, allowed.includes(file.mimetype));
};

const Upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

export default Upload;
