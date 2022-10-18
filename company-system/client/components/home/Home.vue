<template>
  <div>
    <template>
      <div class="container">
        <v-app-bar color="deep-purple" dark>
          <v-toolbar-title>Departments</v-toolbar-title>
          <v-text-field
            height="48"
            v-model="search"
            class="mx-4 mt-7"
            outlined
            dense
            label="Search on Department name"
          ></v-text-field>

          <v-autocomplete
            height="48"
            class="mt-7"
            v-model="select"
            :items="items"
            label="Select Employee"
            item-text="name"
            item-value="des"
            return-object
            outlined
            dense
          ></v-autocomplete>

          <v-col cols="12" sm="6" md="3">
            <v-dialog ref="dialog" v-model="modal" persistent width="300px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  class="mt-9"
                  v-model="date"
                  label="Filter on date"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>

          <v-btn class="searchBtn" height="" text @click="handleSearch">
            <v-icon>mdi-magnify</v-icon>
            Search
          </v-btn>

          <v-btn height="" text @click="createDilog = true">
            <v-icon>mdi-plus</v-icon>
            <div v-if="createDilog">
              <AddDepartmentItem
                @close-dialog="createDilog = false"
                :createDilog="createDilog"
                :initPage="initPage"
              />
            </div>
            Create
          </v-btn>
        </v-app-bar>

        <v-container class="grey lighten-5">
          <v-row no-gutters>
            <v-col
              v-for="(department, i) in getDepartments"
              :key="i"
              align-self="center"
            >
              <Department :department="department" :getData="getData" />
            </v-col>
          </v-row>
        </v-container>
        <!-- pagination -->
        <v-pagination
          class="pagination mb-2"
          v-model="page"
          :length="pages"
          @input="updatePage"
        ></v-pagination>
        <span class="grey--text">Items per page</span>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              text
              color="primary"
              class="ml-2"
              v-bind="attrs"
              v-on="on"
            >
              {{ pageSize }}
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(number, index) in itemsPerPageArray"
              :key="index"
              @click="updateItemsPerPage(number)"
            >
              <v-list-item-title>{{ number }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Department from '../../components/Department.vue'
import AddDepartmentItem from '../../components/AddDepartmentItem.vue'
import axios from 'axios'
export default {
  name: 'Home',
  components: { Department, AddDepartmentItem },
  data() {
    return {
      page: 1,
      pageSize: 3,
      itemsPerPageArray: [3, 6, 9, 12],
      listCount: 0,
      historyList: [],
      alignments: ['start', 'center', 'end'],
      search: null,
      label: 'Search on Department name',
      select: null,
      items: [
        { id: 1, name: 'saleh', gender: 'male', field: 'development' },
        { id: 2, name: 'haneen', gender: 'female', field: 'development' },
        { id: 3, name: 'fatimah', gender: 'female', field: 'development' },
        { id: 4, name: 'beshir', gender: 'male', field: 'development' },
        { id: 5, name: 'banan', gender: 'demale', field: 'architict' },
      ],
      menu: null,
      modal: null,
      date: null,
      createDilog: false,
      serviceWorker: null,
    }
  },
  computed: {
    ...mapGetters({
      getDepartments: 'getDepartments',
    }),
    pages() {
      if (this.pageSize == null || this.listCount == null) return 0
      return Math.ceil(this.listCount / this.pageSize)
    },
  },
  methods: {
    ...mapActions({
      getAllDepartments: 'getAllDepartments',
    }),
    async getData(data) {
      try {
        await this.getAllDepartments(data)
        this.initPage(this.getDepartments)
      } catch (error) {
        console.log(error)
      }
    },
    initPage(data) {
      try {
        if (data) {
          this.listCount = data.length
          if (this.listCount < this.pageSize) {
            this.historyList = data
          } else {
            this.historyList = data.slice(0, this.pageSize)
          }
        }
        this.updatePage(this.page)
      } catch (error) {
        console.log(error)
      }
    },
    updatePage(pageIndex) {
      try {
        let _start = (pageIndex - 1) * this.pageSize
        let _end = pageIndex * this.pageSize
        this.historyList = this.getDepartments.slice(_start, _end)
        this.page = pageIndex
      } catch (error) {}
    },
    updateItemsPerPage(number) {
      try {
        this.pageSize = number
        this.getData()
      } catch (error) {
        console.log(error)
      }
    },
    async handleSearch() {
      try {
        this.page = 1
        this.pageSize = 3
        let searchDto
        searchDto = {
          name: this.search,
          employee: this.select ? this.select.id : undefined,
          date: this.date,
        }
        console.log('gg', searchDto)
        this.getData(searchDto)
        this.select = null
      } catch (error) {
        console.log(error)
      }
    },
    // async subscribe() {
    //   this.serviceWorker = await navigator.serviceWorker.ready;
    //   const clientID = await this.serviceWorker.pushManager.subscribe({
    //     userVisibleOnly: true,
    //     applicationServerKey:
    //       "BENkEd8FVuv9UKNlxVCwEo53On94gZYkOhp4O5fwvGhYcQ2LM1aAzNkf5Cy3xXe2NSCUNt2QxTbCff4tAPLKNb0",
    //   });
    //   console.log('sss',clientID);
    //   // {...}
    //   axios
    //     .post(
    //       `http://localhost:3000/subscribe`)
    //     .then((category_sub_response) => {
    //       console.log("category_sub_response :>> ", category_sub_response);
    //     });
    // },
  },
  async created() {
    // this.getData()
 
    // this.subscribe()
  },
}
</script>
<style scoped>
.main {
  margin-top: 13%;
}
.container {
  padding-bottom: 50px;
}
</style>
