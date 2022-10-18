const { sequelize } = require("../models/index");

const createDriverRecored = async (driverDTO) => {
  try {
    return await sequelize.models.Drivers.create(driverDTO);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createDriverRecored,
};
