const sequelize = require("../../dbconn")
const Sequelize = require('sequelize')

const Users = sequelize.define(
    "users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        mobile: {
            type: Sequelize.STRING,
            allowNull: false,
            // unique: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,

        },
        isActive : {
            type: Sequelize.BOOLEAN,
            default: false
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

module.exports = Users