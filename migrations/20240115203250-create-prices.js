'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('price', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid:{
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
      },
      ProductcardforeignId:{
        type: DataTypes.UUID,
        allowNull: false,
      },
      originalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      discountedPrice: {
        type: DataTypes.FLOAT
      },
      offer: {
        type: DataTypes.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('price');
  }
};