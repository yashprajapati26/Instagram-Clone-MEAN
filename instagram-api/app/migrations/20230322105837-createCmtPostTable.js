'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
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
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("cmtPost");

  }
};
