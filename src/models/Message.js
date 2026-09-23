import { DataTypes } from "@sequelize/core";
import BaseModel from "./Model.js";
import sequelize from "../database/database.js";

class Message extends BaseModel { }

Message.init(
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
        email: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        subject: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        read_status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        tableName: "messages",
        modelName: "Message",
        timestamps: true,
        underscored: true
    }
);

export default Message;
