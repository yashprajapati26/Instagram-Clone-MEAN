const sequelize = require("../../dbconn")
const Sequelize = require('sequelize')

const CmtPost = sequelize.define(
    "cmtPost", {
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
        comment: {
            type: Sequelize.TEXT,
            allowNull: false
          },
        cmtBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                field: "id",
            },
        },
        parentId :{
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: "cmtPost",
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


module.exports = CmtPost