#!/usr/bin/env node

import fs from "fs";
import path from "path";

const command = process.argv[2];
const name = process.argv[3];

if (command === "make:controller") {

    if (!name) {
        console.log("Nama controller wajib diisi.");
        process.exit(1);
    }

    const fileName = `${name}Controller.js`;

    const filePath = path.join(
        process.cwd(),
        "src/controllers",
        fileName
    );

    const content = `class ${name}Controller {

}

export default ${name}Controller;
`;

    fs.writeFileSync(
        filePath,
        content,
        "utf8"
    );

    console.log(
        `Controller berhasil dibuat: ${fileName}`
    );

}