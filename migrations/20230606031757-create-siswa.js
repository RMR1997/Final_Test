'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('siswas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      tanggalLahir: {
        type: Sequelize.DATE
      },
      tempatLahir: {
        type: Sequelize.STRING
      },
      kelas: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      noHp: {
        type: Sequelize.STRING
      },
      namaOrtu: {
        type: Sequelize.STRING
      },
      noHpOrtu: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('siswas');
  }
};