<template>
  <div>
    <v-card
      shaped
      class="rounded-card mx-auto mt-5"
      max-width="350"
      min-width="350"
    >
      <v-card-title>{{ department.name }}</v-card-title>
      <v-card-subtitle class="mt-5"
        ><span class="font-weight-black">Description : </span>
        {{ department.description }}</v-card-subtitle
      >
      <v-card-subtitle
        ><span class="font-weight-black">Employees : </span
        >{{ department.employees.length }} /{{
          department.capacity
        }}</v-card-subtitle
      >
      <v-card-subtitle
        ><span class="font-weight-black">Created At : </span
        >{{ department.date }}</v-card-subtitle
      >
      <v-card-actions class="d-flex justify-center" align-self="center">
        <v-btn icon>
          <UpdateDepartment :department="department" :getData="getData" />
          <!-- <v-icon>mdi-twitter</v-icon> -->
        </v-btn>
        <v-btn @click="dialog = true">
          <Dialog
            :department="department"
            :dialog="dialog"
            @close="dialog = false"
          />
          Show more
        </v-btn>
        <v-btn icon color="error" @click="deleteDepartment">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import UpdateDepartment from './UpdateDepartment.vue'
import Dialog from './Dialog.vue'
export default {
  data() {
    return {
      dialog: false,
    }
  },
  props: {
    department: {
      type: Object,
    },
    getData: {
      type: Function,
    },
  },
  methods: {
    ...mapActions(['remove', 'getAllDepartments']),
    icon(gender) {
      return gender === 'male' ? 'mdi-gender-male' : 'mdi-gender-female'
    },
    iconColor(gender) {
      return gender === 'male' ? 'blue' : 'pink'
    },
    toolTipText(gender) {
      return gender === 'male' ? 'Male' : 'Female'
    },
    count() {
      return `employees : ${this.task.employees.length} / ${this.task.capacity}`
    },
    async deleteDepartment() {
      try {
        await this.remove(this.department.id)
        // this.getData()
      } catch (error) {
        console.log(error)
      }
    },
  },
  components: { UpdateDepartment, Dialog },
}
</script>

<style lang="scss" scoped></style>
