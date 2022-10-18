const axios =require('axios')
const getDepartments = async (dataGiven) => {
  console.log(dataGiven);
  try {
   const {data}= await axios.post(
      'http://localhost:3000/departments/getDepartment',dataGiven
    );
    console.log(data);
    return data          
  } catch (error) {
    throw error
  }
}

const deleteDepartments = async (id) => {
  try {
   const {data}= await axios.post(
      'http://localhost:3000/departments/deleteDepartment',id
    );
    return data          
  } catch (error) {
    throw error
  }
}

const createDepartment=async (departmentDTO)=>{
  try {
    const {data}= await axios.post(
       'http://localhost:3000/departments/addDepartment',departmentDTO
     );
     return data          
   } catch (error) {
     throw error
   }
}

const updateDepartment=async (departmentDTO)=>{
  try {
    const {data}= await axios.post(
       'http://localhost:3000/departments/updateDepartment',departmentDTO
     );
     return data          
   } catch (error) {
     throw error
   }
}

module.exports = {
  getDepartments,
  deleteDepartments,
  createDepartment,
  updateDepartment
}
