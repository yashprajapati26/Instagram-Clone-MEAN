'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("likedPost");

  }
};
