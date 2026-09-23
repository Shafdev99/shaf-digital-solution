import "dotenv/config";

const config = {
    name: process.env.APP_NAME,
    port: Number(process.env.PORT || 3000),
    environment: process.env.NODE_ENV
};

export default config;