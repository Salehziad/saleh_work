<template>
  <div class="main">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card max-width="475" class="mx-auto">
          <v-toolbar dark color="teal">
            <v-app-bar-nav-icon>
              <v-icon>mdi-view-grid</v-icon>
            </v-app-bar-nav-icon>
            <v-toolbar-title>Departments</v-toolbar-title>
            <v-spacer />
            <AddDepartmentItem />
          </v-toolbar>

          <v-list>
            <v-list-item-group multiple>
              <DepartmentItem
                v-for="(task, i) in getDepartments"
                :key="i"
                :task="task"
              />
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DepartmentItem from '../components/DepartmentItem.vue'
import AddDepartmentItem from '../components/AddDepartmentItem.vue'
export default {
  name: 'IndexPage',
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'name',
      keys: [
        'Name',
        'Calories',
        'Fat',
        'Carbs',
        'Protein',
        'Sodium',
        'Calcium',
        'Iron',
      ],
      items: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6,
          carbs: 24,
          protein: 4,
          sodium: 87,
          calcium: '14%',
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16,
          carbs: 23,
          protein: 6,
          sodium: 337,
          calcium: '6%',
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0,
          carbs: 94,
          protein: 0,
          sodium: 50,
          calcium: '0%',
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      getDepartments: 'getDepartments',
    }),
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
  },
  methods: {
    ...mapActions({
      getAllDepartments: 'getAllDepartments',
    }),
  },
  mounted() {
    this.getAllDepartments()
  },
  components: { DepartmentItem, AddDepartmentItem },
}
</script>
<style scoped>
.main{
  margin-top: 13%;  
}
</style>

