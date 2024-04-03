'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ColorNames extends Model {
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
  ColorNames.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    colorCode: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg: 'Product must have a colorCode'},
        notEmpty:{msg: 'colorCode must not be empty'}
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
  }, {
    sequelize,
    tableName:'colornames',
    modelName: 'ColorNames',
  });
  return ColorNames;
};