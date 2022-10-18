const { sequelize } = require("../models/index");

const createCarRecored = async (carDTO) => {
  try {
    return await sequelize.models.Cars.create(carDTO);
  } catch (error) {
    throw error;
  }
};

const updateRecoredStatusById = async (id, modelname, recordStatus) => {
  try {
    return await sequelize.models[modelname].update(
      {
        recordStatus: recordStatus,
      },
      {
        where: { id, recordStatus: "LATEST" },
      }
    );
  } catch (error) {
    throw error;
  }
};

const findRecordByIdAndTable = async (id, modelname, recordStatus) => {
  try {
    return await sequelize.models[modelname].findOne({
      where: { id, recordStatus },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCarRecored,
  findRecordByIdAndTable,
  updateRecoredStatusById,
};
