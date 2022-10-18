'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */ await queryInterface.bulkInsert('assigns', [{
      task_id:"dfssfs",
      user_id:2,
      createdAt:new Date(Date.now()),
      updatedAt:new Date(Date.now())
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
