import test from "node:test";
import assert from "node:assert";

import app from "../src/app.js";
import Validator from "../src/validation/Validator.js";
import CmsService from "../src/services/CmsService.js";

async function fetchPage(path) {
    const server = app.listen(0);

    try {
        await new Promise(resolve => server.once("listening", resolve));

        const { port } = server.address();
        const response = await fetch(`http://127.0.0.1:${port}${path}`);
        const body = await response.text();

        return {
            status: response.status,
            redirected: response.redirected,
            finalUrl: response.url,
            headers: response.headers,
            body
        };
    } finally {
        await new Promise(resolve => server.close(resolve));
    }
}

test("required validation harus gagal jika field kosong", () => {

    const result = Validator.validate(
        {
            name: ""
        },
        {
            name: "required"
        }
    );

    assert.deepStrictEqual(
        result,
        {
            name: "name wajib diisi"
        }
    );

});

test("required validation harus berhasil jika field terisi", () => {

    const result = Validator.validate(
        {
            name: "Produk A"
        },
        {
            name: "required"
        }
    );

    assert.strictEqual(result, null);

});

test("landing page dapat dirender dengan konten SHAF", async () => {
    const result = await fetchPage("/");

    assert.strictEqual(result.status, 200);
    assert.match(result.body, /SHAF Digital Solution|Ide yang masih berantakan/i);
});

test("dashboard memerlukan login", async () => {
    const result = await fetchPage("/dashboard");

    assert.ok(result.redirected || result.finalUrl.endsWith("/login"));
    assert.match(result.body, /Masuk ke dashboard|Username|Password/i);
});

test("CMS service menyimpan, memperbarui, dan menghapus layanan", async () => {
    const slug = `test-service-${Date.now()}`;
    const created = await CmsService.save("services", null, {
        title: "Test Service",
        slug,
        description: "Service test",
        status: "draft",
        order: 99
    });

    try {
        assert.strictEqual(created.slug, slug);
        const updated = await CmsService.save("services", created.id, {
            title: "Updated Test Service",
            slug,
            description: "Updated description",
            status: "published",
            order: 1
        });
        assert.strictEqual(updated.title, "Updated Test Service");
        assert.strictEqual(updated.status, "published");
    } finally {
        await CmsService.remove("services", created.id);
    }
});