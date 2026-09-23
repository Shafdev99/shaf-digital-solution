import { DataTypes } from "@sequelize/core";
import BaseModel from "./Model.js";
import sequelize from "../database/database.js";

class ProductModel extends BaseModel { }

ProductModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        short_description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        category: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: "digital"
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
        tableName: "products_catalog",
        modelName: "ProductModel",
        timestamps: true,
        underscored: true
    }
);

export default ProductModel;
