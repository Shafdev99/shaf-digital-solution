import { DataTypes } from "@sequelize/core";
import BaseModel from "./Model.js";
import sequelize from "../database/database.js";

class Testimonial extends BaseModel { }

Testimonial.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        role: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        quote: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM("draft", "published"),
            defaultValue: "published"
        },
        order: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize,
        tableName: "testimonials",
        modelName: "Testimonial",
        timestamps: true,
        underscored: true
    }
);

export default Testimonial;
