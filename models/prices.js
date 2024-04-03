'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prices extends Model {
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
  Prices.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    originalPrice:  {
      type:DataTypes.FLOAT,
      allowNull:false,
    },
    discountedPrice:  {
      type:DataTypes.FLOAT,
    },
    offer:  {
      type:DataTypes.FLOAT,
    },
  }, {
    sequelize,
    tableName:'price',
    modelName: 'Prices',
  });
  return Prices;
};