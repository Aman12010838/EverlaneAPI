'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productcard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Products ,Prices ,ColorNames,ClothCategory}) {
      this.belongsTo(Products, { foreignKey: 'ProductforeignId', as: 'products' });
      this.hasMany(Prices, { foreignKey: 'ProductcardforeignId', as: 'prices' });
      this.hasMany(ColorNames, { foreignKey: 'ProductcardforeignId', as: 'colorNames' })
      this.hasMany(ClothCategory, { foreignKey: 'ProductcardforeignId', as: 'clothCategorys' })
    }
    toJSON() {
      return { ...this.get(), id: undefined,createdAt:undefined,updatedAt:undefined,ProductforeignId:undefined}
    }
  }
  Productcard.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    imageURL: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg: 'Product must have a imageURL'},
        notEmpty:{msg: 'imageURL must not be empty'}
      }
    },
    title: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg: 'Product must have a title'},
        notEmpty:{msg: 'title must not be empty'}
      }
    },
    sizeRoman: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg: 'Product must have a sizeRoman'},
        notEmpty:{msg: 'sizeRoman must not be empty'}
      }
    },
    sizeNumber: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg: 'Product must have a sizeNumber'},
        notEmpty:{msg: 'sizeNumber must not be empty'}
      }
    },
    totalProductSale: {
      type:DataTypes.INTEGER,
      allowNull:false,
      },
    
    color:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg: 'Product must have a color'},
        notEmpty:{msg: 'color must not be empty'}
      }
    },
    category: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg: 'Product must have a category'},
        notEmpty:{msg: 'category must not be empty'}
      }
    },
    isAvailable:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notNull:{msg: 'Product must have a isAvailable'},
        notEmpty:{msg: 'isAvailable must not be empty'}
      }
    },
  }, {
    sequelize,
    tableName:'productcard',
    modelName: 'Productcard',
  });
  return Productcard;
};