<template>
  <v-dialog v-model="open" max-width="350">
    <template v-slot:activator="{ on }">
      <v-btn color="blue" @click="initialFormData" icon v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline teal--text">
        Update Department
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="form.name"
            :rules="rules.name"
            label="Name"
            required
          />
          <v-text-field
            v-model="form.description"
            :rules="rules.description"
            label="Description"
            required
          />
          <v-text-field
            v-model="form.capacity"
            :rules="rules.capacity"
            label="Capacity"
            required
          />
          <v-autocomplete
            class="mt-3"
            v-model="select"
            :items="items"
            label="Employees"
            item-text="name"
            item-value="des"
            return-object
            multiple
            outlined
            dense
          ></v-autocomplete>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer>
          <v-btn color="teal" @click="updateRecord"> Update </v-btn>
        </v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AddDepartmentItem',
  props: {
    department: {
      type: Object,
    },
    getData: {
      type: Function,
    },
  },
  data() {
    return {
      open: false,
      select: [],
      items: [
        { name: 'saleh', gender: 'male', field: 'development' },
        { name: 'haneen', gender: 'female', field: 'development' },
        { name: 'fatimah', gender: 'female', field: 'development' },
        { name: 'beshir', gender: 'male', field: 'development' },
        { name: 'banan', gender: 'demale', field: 'architict' },
      ],
      form: {
        name: null,
        description: null,
        capacity: null,
        id: null,
        employee: null,
      },
      rules: {
        name: [
          (v) => !!v || 'Name is required',
          (v) =>
            (!!v && v.length >= 4) || 'Title must be bigger than 4 characters',
        ],
        description: [
          (v) => !!v || 'Description is required',
          (v) =>
            (!!v && v.length <= 50) ||
            'Description must be less than 50 characters',
        ],
        capacity: [
          (v) => !!v || 'Description is required',
          (v) => (!!v && v <= 25) || 'Capacity must be less than 50 ',
        ],
      },
      DTO: {
        id: [this.id],
      },
    }
  },

  methods: {
    ...mapActions(['create', 'getAllDepartments', 'update']),
    async updateRecord() {
      try {
        if (this.$refs.form.validate()) {
          this.form.id = this.department.id
          this.form.employee = this.select
          await this.update(this.form)
          this.getAllDepartments()
          this.getData()
          this.$refs.form.reset()
          this.open = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    initialFormData() {
      try {
        this.form.name = this.department.name
        this.form.description = this.department.description
        this.form.capacity = this.department.capacity
        this.select = this.department.employees
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
