import { DataTypes } from "@sequelize/core";
import BaseModel from "./Model.js";
import sequelize from "../database/database.js";

class Portfolio extends BaseModel { }

Portfolio.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        category: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: "WEB DESIGN"
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        url: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM("draft", "published"),
            defaultValue: "published"
        },
        featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        order: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize,
        tableName: "portfolio",
        modelName: "Portfolio",
        timestamps: true,
        underscored: true
    }
);

export default Portfolio;
