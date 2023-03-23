const sequelize = require("../../dbconn")
const Sequelize = require('sequelize')

const postImages = sequelize.define(
    "postImages", {
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
        imagePath: {
            type: Sequelize.TEXT,
            allowNull : false
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


module.exports = postImages