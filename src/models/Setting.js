import { DataTypes } from "@sequelize/core";
import BaseModel from "./Model.js";
import sequelize from "../database/database.js";

class Setting extends BaseModel { }

Setting.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        key: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: "settings",
        modelName: "Setting",
        timestamps: true,
        underscored: true
    }
);

export default Setting;
