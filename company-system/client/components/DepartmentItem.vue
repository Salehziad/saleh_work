<template>
  <div>
    <v-list-item v-if="task" inactive>
      <Dialog :task="task" :dialog="dialog" @close="dialog = false"/>
      <v-list-item-action>
        <UpdateDepartment :task="task" />
      </v-list-item-action>
      <v-list-item-content class="ml-4" @click="dialog = true">
        <v-list-item-title v-text="task.name" />
        <v-list-item-subtitle v-text="task.description" />
        <v-list-item-subtitle v-text="count()" />
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon color="error" @click="deleteDepartment">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UpdateDepartment from './UpdateDepartment.vue'
import Dialog from './Dialog.vue'
export default {
  name: 'DepartmentItem',
  data() {
    return {
      dialog: false,
    }
  },
  props: {
    task: {
      type: Object,
      default: null,
    },
  },
  computed: {},
  methods: {
    icon(gender) {
      return gender === 'male' ? 'mdi-gender-male' : 'mdi-gender-female'
    },
    iconColor(gender) {
      return gender === 'male' ? 'blue' : 'pink'
    },
    toolTipText(gender) {
      return gender === 'male' ? 'Male' : 'Female'
    },
    ...mapActions(['remove', 'getAllDepartments']),
    count() {
      return `employees : ${this.task.employees.length} / ${this.task.capacity}`
    },
    async deleteDepartment() {
      // this.dialog=false;
      await this.remove(this.task.id)
      // this.getAllDepartments()
    },
  },
  mounted() {},
  components: { UpdateDepartment, Dialog },
}
</script>

<style scoped>
#xx {
  min-height: 500px;
}
</style>
