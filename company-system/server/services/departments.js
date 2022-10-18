const { sequelize } = require("../models/index");
createDepartmentRecord = async (departmentDTO) => {
  try {
    return await sequelize.models.Departments.create(departmentDTO);
  } catch (error) {
    console.log(error);
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

module.exports = {
  createDepartmentRecord,
  findRecordByIdAndTable,
  updateRecoredStatusById
};
