import "dotenv/config";
import { Sequelize } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";

import databaseConfig from "./config.js";

const sequelize = new Sequelize({
    dialect: MySqlDialect,

    host: databaseConfig.host,
    port: databaseConfig.port,

    database: databaseConfig.database,
    user: databaseConfig.user,
    password: databaseConfig.password
});

export default sequelize;