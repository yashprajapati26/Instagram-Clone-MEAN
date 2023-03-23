const sequelize = require("../../dbconn");
const Sequelize = require("sequelize");

const userFollowers = sequelize.define(
  "userFollowers",
  {
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
    followerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        field: "id",
      },
    },
    status:{
        type:Sequelize.STRING,
        allowNull: false,
        defaultValue : "Pending"
    }
  },
  {
    freezeTableName: true,
    // disable the modification of tablenames; By default
  }
);
module.exports = userFollowers;
