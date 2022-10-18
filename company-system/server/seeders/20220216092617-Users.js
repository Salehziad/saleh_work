'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
      await queryInterface.bulkInsert(
        "Users",
        [
          {
            username: "firas diab",
            
          },
          {
            username: "ahmed",
          },
          {
            username: "omar",
          },
          {
            username: "othman",
          },
        ],
        {}
      );
    
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
