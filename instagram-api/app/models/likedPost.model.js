const sequelize = require("../../dbconn")
const Sequelize = require('sequelize')

const LikedPost = sequelize.define(
    "likedPost", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        postId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "post",
                field: "id",
            },
        },
        likedBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                field: "id",
            },
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


module.exports = LikedPost