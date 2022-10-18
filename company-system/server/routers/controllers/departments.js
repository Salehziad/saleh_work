const { sequelize } = require("../../models/index");
const { Op } = require("sequelize");
const uuid = require("uuid");
const {
  createDepartmentRecord,
  findRecordByIdAndTable,
  updateRecoredStatusById,
} = require("../../services/departments");

const { createEmployeeRecored } = require("../../services/employee");

const { whereINDataType } = require("../../shared/queryBulder");
const { wherINJSON } = require("../../shared/queryBulder");
/* -----------------------------------------------------------------------------------------------------------------------*/

const addDepartment = async (req, res) => {
  try {
    const { name, description, capacity, employee } = req.body;
    // console.log(employee);
    const id = uuid.v4();
    const date = getCurrentDateAndTime();
    console.log(date);
    const departmentDTO = {
      id,
      name,
      description,
      capacity,
      date,
    };
    const response = await createDepartmentRecord(departmentDTO);
    // console.log(response);
    const employeeResponse = await createEmployeeForDepartment(
      employee,
      response.id
    );
    res
      .status(201)
      .json({ ...response.dataValues, employees: employeeResponse });
  } catch (error) {
    res.status(401).json(error.message);
  }
};

const getDepartment = async (req, res) => {
  try {
    let { id, name, date, capacity, employee } = req.body;
    // find all departments id that refer to employee id
    // let departmentsId = await findAllDepartmentsIdByUserId(employee);
    console.log(date);
    let departmentsId;
    if (employee) {
      departmentsId = await findAllDepartmentsIdByUserId(employee);
    }
    
    let departments = await sequelize.models.Departments.findAndCountAll({
      where: {
        [Op.and]: [
          employee ? whereINDataType("id", "in", departmentsId) : "",
          name ? whereINDataType("name", "like", name) : "",
          date ? whereINDataType("date", "eq", date) : "",
          {
            recordStatus: "LATEST",
          },
        ],
      },
      // limit:1,
    });
    // console.log('dd',departments);
    departments.rows = await getEmployeesForDepartmentsByDepartmentId(
      departments.rows
    );
    res.status(200).json(departments);
  } catch (error) {
    // console.log(error);
    res.status(401).json(error.message);
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id, name, description, capacity, employee } = req.body;
    const oldDepartment = await findRecordByIdAndTable(
      id,
      "Departments",
      "LATEST"
    );
    await updateRecoredStatusById(id, "Departments", "UPDATED");
    const departmentDTO = {
      id,
      name: name ? name : oldDepartment.name,
      description: description ? description : oldDepartment.description,
      capacity: capacity ? capacity : oldDepartment.capacity,
    };
    const response = await createDepartmentRecord(departmentDTO);
    await updateEmployeesStatusByDepartmentId(id, "Employees", "DELETED");
    if (employee) {
      await createEmployeeForDepartment(employee, id);
    }
    res.send(response);
  } catch (error) {}
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.body;
    const oldDepartment = await findRecordByIdAndTable(
      id,
      "Departments",
      "LATEST"
    );
    await updateRecoredStatusById(id, "Departments", "DELETED");
    await updateEmployeesStatusByDepartmentId(id, "Employees", "DELETED");
    res.send(oldDepartment);
  } catch (error) {
    res.status(401).json(error.message);
  }
};

/* -----------------------------------------------------------------------------------------------------------------------*/

module.exports = {
  addDepartment,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};

const getEmployeesForDepartmentsByDepartmentId = async (departments) => {
  // console.log(departments.datavalues);
  try {
    const response = [];
    for (let i = 0; i < departments.length; i++) {
      const department = departments[i];
      const employees = await sequelize.models.Employees.findAll({
        where: {
          departmentId: department.id,
          recordStatus: "LATEST",
        },
      });
      response.push({ ...department.dataValues, employees });
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const createEmployeeForDepartment = async (employee = [], departmentId) => {
  try {
    const arr = [];
    for (let i = 0; i < employee.length; i++) {
      const emplo = employee[i];
      const employeeDTO = {
        id: uuid.v4(),
        employee: {
          id: emplo.id,
          name: emplo.name,
          gender: emplo.gender,
          field: emplo.field,
        },
        departmentId,
      };
      const response = await createEmployeeRecored(employeeDTO);
      arr.push(response.dataValues);
    }
    return arr;
  } catch (error) {
    throw error;
  }
};

const getEmployeesByDepartmentId = async (id) => {
  try {
    const employee = await sequelize.models.Employees.findAll({
      where: {
        departmentId: id,
        recordStatus: "LATEST",
      },
    });
    return employee;
  } catch (error) {}
};
const findAllDepartmentsIdByUserId = async (employee) => {
  try {
    let departmentsId = [];
    let departments = await sequelize.models.Employees.findAndCountAll({
      where: {
        [Op.and]: [
          employee ? wherINJSON("employee", "eq", "id", employee) : "",
          {
            recordStatus: "LATEST",
          },
        ],
      },
    });
    departments.rows.forEach((e) => departmentsId.push(e.departmentId));
    return departmentsId;
  } catch (error) {
    console.log(error);
  }
};

const updateEmployeesStatusByDepartmentId = async (
  departmentId,
  modelname,
  recordStatus
) => {
  try {
    return await sequelize.models[modelname].update(
      {
        recordStatus: recordStatus,
      },
      {
        where: { departmentId, recordStatus: "LATEST" },
      }
    );
  } catch (error) {
    throw error;
  }
};

const getCurrentDateAndTime = () => {
  try {
    // this function dont take any parametrs and its  return the  current
    // date and  time
    let today = new Date();
    let CurrentDate = new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10);
    let hour =
      today.getHours() + "".length == 1
        ? "0" + today.getHours()
        : today.getHours() + "";
    let min = today.getMinutes() + "";
    if (hour.length === 1) hour = "0" + hour;
    if (min.length === 1) min = "0" + min;
    let currentTime = hour + ":" + min;
    return CurrentDate;
  } catch (error) {
    throw error;
  }
};
