import { DataTypes } from "@sequelize/core";
import BaseModel from "./Model.js";
import sequelize from "../database/database.js";

class User extends BaseModel {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password_hash: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        recovery_code_hash: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
            defaultValue: "Admin SHAF"
        }
    },
    {
        sequelize,
        tableName: "users",
        modelName: "User",
        timestamps: true,
        underscored: true
    }
);

export default User;
