import { DataTypes } from "@sequelize/core";
import BaseModel from "./Model.js";
import sequelize from "../database/database.js";

class Service extends BaseModel { }

Service.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        icon: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        order: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM("draft", "published"),
            defaultValue: "published"
        }
    },
    {
        sequelize,
        tableName: "services",
        modelName: "Service",
        timestamps: true,
        underscored: true
    }
);

export default Service;
