const sequelize = require("../../dbconn")
const Sequelize = require('sequelize')

const otpStorage = sequelize.define(
    "otpStorage", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                field: "id",
            },
        },
        otp: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        createdAt: {
            field: "created_at",
            type: Sequelize.DATE,
            allowNull: false,
        },
        updatedAt: {
            field: "updated_at",
            type: Sequelize.DATE,
        },

    }, {
        freezeTableName: true,
        // disable the modification of tablenames; By default
    }
);

module.exports = otpStorage