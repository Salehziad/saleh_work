import {
  getDepartments,
  deleteDepartments,
  createDepartment,
  updateDepartment,
} from '../../static/services/department'
const mainStore = {
  namespace: true,
  state: {
    departments: [],
  },
  actions: {
    async getAllDepartments({ commit },data) {
      try {
        const response = await getDepartments(data)
        commit('setDepartments', response.rows)
      } catch (error) {
        console.log(error)
      }
    },

    async update(state, departmentDTO) {
      try {
        const response = await updateDepartment(departmentDTO)
      } catch (error) {
        console.log(error)
      }
    },

    async remove({ commit }, id) {
      try {
        commit('remove', id)
        const response = await deleteDepartments({ id })
      } catch (error) {
        throw error
      }
    },

    async create({state,commit}, departmentDTO) {
      try {
       const  response = await createDepartment(departmentDTO)
        commit('setDepartments', [...state.departments , response ])
      } catch (error) {
        console.log(error.message)
      }
    },
  },
  mutations: {
    setDepartments(state, payload) {
      return (state.departments = payload)
    },
    remove(state, id) {
      console.log(state.departments);
      state.departments = state.departments.filter((dep) => dep.id !== id)
      console.log(state.departments);
    },
  },
  getters: {
    getDepartments(state) {
      return state.departments
    },
  },
}

export default mainStore
