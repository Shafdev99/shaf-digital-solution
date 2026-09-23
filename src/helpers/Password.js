import crypto from "node:crypto";

const KEY_LENGTH = 64;

export function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");
    return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
    if (!storedHash || !storedHash.includes(":")) return false;

    const [salt, key] = storedHash.split(":");
    const derived = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");

    return crypto.timingSafeEqual(
        Buffer.from(key, "hex"),
        Buffer.from(derived, "hex")
    );
}
