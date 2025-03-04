'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("SecurePWD123*", salt);

    await queryInterface.bulkInsert('Users', [
      {
        fullname: "Lodgerin admin",
        password: hash,
        email: "admin@example.com",
        roleId: 1
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
