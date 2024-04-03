'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClothCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Productcard }) {
      this.belongsTo(Productcard, { foreignKey: 'ProductcardforeignId', as: 'productCards' });
      
    }
    toJSON() {
      return { ...this.get(), id: undefined,createdAt:undefined,updatedAt:undefined,ProductcardforeignId:undefined}
    }
  }
  ClothCategory.init({
    title: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg: 'Product must have a title'},
        notEmpty:{msg: 'title must not be empty'}
      }
    },
  }, {
    sequelize,
    tableName:'clothcategory',
    modelName: 'ClothCategory',
  });
  return ClothCategory;
};