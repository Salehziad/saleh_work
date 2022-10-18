<template>
  <v-dialog v-model="createDilog" max-width="350" persistent>
    <v-card>
      <v-card-title class="headline teal--text">
        Create New Department
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
            class="mt-3"
            v-model="form.description"
            :rules="rules.description"
            label="Description"
            required
          />
          <v-text-field
            class="mt-3"
            v-model="form.capacity"
            :rules="rules.capacity"
            label="Capacity"
            required
          />
          <v-combobox
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
          ></v-combobox>
        </v-form>
      </v-card-text>

      <v-card-actions class="pb-6">
        <v-spacer>
          <v-btn class="ml-9" color="teal" @click="save"> Save </v-btn>
        </v-spacer>
        <v-spacer>
          <v-btn class="ml-15" color="teal" @click="closeDialog"> close </v-btn>
        </v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AddDepartmentItem',

  props: {
    initPage: {
      type: Function,
    },
    createDilog: {
      type: Boolean,
    },
  },
  data() {
    return {
      open: false,
      form: {
        name: null,
        description: null,
        capacity: null,
        employee: {},
      },
      select: [],
      items: [
        { id: 1, name: 'saleh', gender: 'male', field: 'development' },
        { id: 2, name: 'haneen', gender: 'female', field: 'development' },
        { id: 3, name: 'fatimah', gender: 'female', field: 'development' },
        { id: 4, name: 'beshir', gender: 'male', field: 'development' },
        { id: 5, name: 'banan', gender: 'demale', field: 'architict' },
      ],
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
      dialog: this.createDilog,
    }
  },
  computed: {
    ...mapGetters({
      getDepartments: 'getDepartments',
    }),
  },

  methods: {
    ...mapActions(['create', 'getAllDepartments']),
    async save() {
      if (this.$refs.form.validate()) {
        this.form.employee = this.select
        await this.create(this.form)
        await this.getAllDepartments()
        this.$refs.form.reset()
        this.dialog = !this.dialog
        this.$emit('close-dialog', this.isOpen)
      }
    },
    closeDialog() {
      this.dialog = !this.dialog
      this.$emit('close-dialog', this.isOpen)
    },
  },
}
</script>

<style lang="scss" scoped></style>
