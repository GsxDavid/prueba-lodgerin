'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Roles', [
      { name: "admin" }, { name: "guest" }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});

    // Se reinicia el contador de la primary Key para garantizar que siempre tengan el mismo valor y no afectar el seeder de usuarios ya que este apunta a un valor fijo
    await queryInterface.sequelize.query("ALTER SEQUENCE roles_id_seq RESTART WITH 1;");
  }
};
