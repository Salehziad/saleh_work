'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employees.init(
    {
      seq: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      employee:{type: DataTypes.JSON},
      id: { type: DataTypes.STRING, allowNull: false },
      departmentId: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING },
      gender: { type: DataTypes.STRING },
      field: { type: DataTypes.STRING },

      recordStatus: {
        type: DataTypes.ENUM,
        values: ["LATEST", "UPDATED", "DELETED"],
        allowNull: false,
        defaultValue: "LATEST",
      },
    },
    {
      sequelize,
      modelName: "Employees",
    }
  );
  return Employees;
};