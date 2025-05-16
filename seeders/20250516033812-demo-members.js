'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const members = [
      { id: 27, name: "Nina", meetingRole: "Developer", createdAt: new Date("2025-05-10T10:00:00.000Z"), updatedAt: new Date("2025-05-10T10:00:00.000Z") },
      { id: 28, name: "Oscar", meetingRole: "Developer", createdAt: new Date("2025-05-10T10:00:00.000Z"), updatedAt: new Date("2025-05-10T10:00:00.000Z") },
      { id: 29, name: "Paul", meetingRole: "Developer", createdAt: new Date("2025-05-10T10:00:00.000Z"), updatedAt: new Date("2025-05-10T10:00:00.000Z") },
      { id: 30, name: "Quincy", meetingRole: "Testing", createdAt: new Date("2025-05-10T10:00:00.000Z"), updatedAt: new Date("2025-05-10T10:00:00.000Z") },
      { id: 31, name: "Rita", meetingRole: "Testing", createdAt: new Date("2025-05-10T10:00:00.000Z"), updatedAt: new Date("2025-05-10T10:00:00.000Z") },
      { id: 32, name: "Steve", meetingRole: "Testing", createdAt: new Date("2025-05-10T10:00:00.000Z"), updatedAt: new Date("2025-05-10T10:00:00.000Z") },
      { id: 33, name: "Tina", meetingRole: "Production", createdAt: new Date("2025-05-10T10:00:00.000Z"), updatedAt: new Date("2025-05-10T10:00:00.000Z") },
      { id: 34, name: "Uma", meetingRole: "Production", createdAt: new Date("2025-05-10T10:00:00.000Z"), updatedAt: new Date("2025-05-10T10:00:00.000Z") },
      { id: 35, name: "Victor", meetingRole: "Production", createdAt: new Date("2025-05-10T10:00:00.000Z"), updatedAt: new Date("2025-05-10T10:00:00.000Z") },
    ];

    await queryInterface.bulkInsert('members', members, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('members', {
      id: { [Sequelize.Op.in]: [27, 28, 29, 30, 31, 32, 33, 34, 35] }
    }, {});
  }
};
