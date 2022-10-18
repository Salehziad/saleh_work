<template>
  <div>
    <v-dialog v-model="dialog" scrollable max-width="70%" class="xx" persistent>
    <!-- {{department.employees}} -->
      <v-card>
        <v-card-title>Department Name : {{ department.name }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-4">
            <div>Department Description : </div>{{ department.description }}
            </v-card-text>
        <v-divider></v-divider>
        <v-card-title>Employees : {{ department.employees.length }}</v-card-title>
          <div class="cards">

        <v-card v-for="emplo in department.employees" :key="emplo.employee.id">
          <v-card-title
            >Name :
            <v-list-item-subtitle>{{ emplo.employee.name }}</v-list-item-subtitle>
            Field :
            <v-list-item-subtitle>{{ emplo.employee.field }}</v-list-item-subtitle>
            Gender :
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" :color="iconColor(emplo.employee.gender)">
                  {{ icon(emplo.employee.gender) }}
                </v-icon>
              </template>
              <span>{{ toolTipText(emplo.employee.gender) }}</span>
            </v-tooltip>
          </v-card-title>
        </v-card>
        </div>
        <v-btn color="primary" text @click="closeDialog"> close</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  props: {
    department: {
      type: Object,
    },
    dialog: {
      type: Boolean,
    },
  },
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
    closeDialog() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
.cards{
    display: flex;
    justify-content: space-around;
}
.cards div{
    /* padding-left: 1px; */
    /* background-color: brown; */
}
</style>
