'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    // /**
    //  * Helper method for defining associations.
    //  * This method is not a part of Sequelize lifecycle.
    //  * The `models/index` file will call this method automatically.
    //  */
    static associate({ Productcard }) {
      this.hasMany(Productcard, { foreignKey: 'ProductforeignId', as: 'productCards' })
    }
    toJSON() {
      return { ...this.get(), id: undefined,createdAt:undefined,updatedAt:undefined}
    }
  }
  Products.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg: 'User must have a name'},
        notEmpty:{msg: 'Name must not be empty'}
      }
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg: 'User must have a description'},
        notEmpty:{msg: 'Description must not be empty'}
      }
    }
  }, {
    sequelize,
    tableName: 'products',
    modelName: 'Products',
 });
  return Products;
};