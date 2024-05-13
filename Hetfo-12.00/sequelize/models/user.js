'use strict';
const md5 = require('md5');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post);
      // define association here
    }
    checkPassword(password) {
      return md5(password) == this.password;
    }
    toJSON() {
      const data = this.get();
      delete data.password;
      delete data.createdAt;
      delete data.updatedAt;
      return data;
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};