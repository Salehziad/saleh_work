const { sequelize } = require("../models/index");

const createEmployeeRecored = async (employeeDTO) => {
  try {
    return await sequelize.models.Employees.create(employeeDTO);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
    createEmployeeRecored,
};
