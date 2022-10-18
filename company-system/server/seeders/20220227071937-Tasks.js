'use strict';
const  uuid = require('uuid');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */ 
     await queryInterface.bulkInsert('Tasks', [{
      task_id: uuid.v1(),
      creator: 2,
      creator_name:"firas",
      subject:"conform appiotment",
      description: "call sara and conform appiotment",
      status: "on hold",
      claimed:true,
      priority:"low",
      created_date:'2022-02-27',
      created_time: "9:00 Am",
      due_date: '2022-02-28',
      due_time: "9:00 Am",
      estimated_time: "1:30",
      work_status: "created",
      attachment: "",
      createdAt:new Date(Date.now()),
      updatedAt:new Date(Date.now())
     },
     {
      task_id: uuid.v1(),
      creator: 2,
      creator_name:"firas",
      subject:"cancel appiotment",
      description: "call sara and cancel appiotment",
      status: "on hold",
      claimed:true,
      priority:"low",
      created_date:'2022-02-27',
      created_time: "9:00 Am",
      due_date: '2022-02-28',
      due_time: "9:00 Am",
      estimated_time: "1:30",
      work_status: "created",
      attachment: "",
      createdAt:new Date(Date.now()),
      updatedAt:new Date(Date.now())
     },
     {
      task_id: "uuid",
      creator: 2,
      creator_name:"firas",
      subject:"cancel appiotment",
      description: "call sara and cancel appiotment",
      status: "on hold",
      claimed:true,
      priority:"low",
      created_date:'2022-02-27',
      created_time: "9:00 Am",
      due_date: '2022-02-28',
      due_time: "9:00 Am",
      estimated_time: "1:30",
      work_status: "created",
      attachment: "",
      createdAt:"2022-02-27T08:19:46.632Z",
      updatedAt:"2022-02-27T08:19:46.632Z"
     },
     {
      task_id: "uuid",
      creator: 2,
      creator_name:"firas",
      subject:"cancel appiotment",
      description: "call sara and cancel appiotment",
      status: "completed",
      claimed:true,
      priority:"low",
      created_date:'2022-02-27',
      created_time: "9:00 Am",
      due_date: '2022-02-28',
      due_time: "9:00 Am",
      estimated_time: "1:30",
      work_status: "created",
      attachment: "",
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
