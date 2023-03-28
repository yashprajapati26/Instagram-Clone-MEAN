const sequelize = require("../../dbconn");
const Sequelize = require("sequelize");

const Notification = sequelize.define(
  "notification",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    notificationId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        field: "id",
      },
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    read: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
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
  },
  {
    freezeTableName: true,
    // disable the modification of tablenames; By default
  }
);

module.exports = Notification;
