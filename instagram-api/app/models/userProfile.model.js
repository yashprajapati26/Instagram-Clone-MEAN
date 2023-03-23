const sequelize = require("../../dbconn")
const Sequelize = require('sequelize')

const userProfile = sequelize.define(
    "userProfile", {
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
        profile_img: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        bio: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        dob: {
            type: Sequelize.DATE,
            allowNull: true
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: true
        },
        city: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        country: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        no_of_followers: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        no_of_following: {
            type: Sequelize.INTEGER,
            defaultValue: 0
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

module.exports = userProfile