"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
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
        status: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "Pending",
        },
      },
      {
        freezeTableName: true,
        // disable the modification of tablenames; By default
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("userFollowes");
  },
};
