<template>
  <div class="home">
    <v-card class="generate-circle" @click="createDilog = true">
      <!-- <Dialog /> -->
      <div>
        <div class="dialog-title">
          Generate <br />
          Config Files
        </div>
        <Dialog
          @close-dialog="createDilog = false"
          :createDilog="createDilog"
        />
      </div>
    </v-card>
    <v-card class="register-api-sircle">
      <div>Register<br />API</div>
    </v-card>
    <v-card class="third-circle">
      <div>Third<br />Circle</div>
    </v-card>
    <v-card class="four-circle">
      <div>four<br />Circle</div>
    </v-card>
    <Register />
  </div>
</template>

<script>
import Dialog from './Dialog.vue'
import Register from './Register.vue'
export default {
  name: 'Home',
  components: { Dialog, Register },
  data() {
    return {
      createDilog: false,
      username: '',
      password: '',
      confirmPassword: '',
      status: null,
      showPassword: false,
      loading4: false,
    }
  },
  watch: {
    createDilog() {
      console.log(this.createDilog)
    },
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  background-image: url('../images/background.png');
  background-size: cover;
  height: 100vh;
}
.generate-circle {
  background-color: #5f84a2;
  width: 140px;
  height: 140px;
  margin: 50px 0 50px 150px;
  border-radius: 50%;
  position: absolute;
  left: -4%;
  top: 20%;

  .dialog-title {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    color: #ffffff;
    margin-top: 43px;
  }
  dialog {
    color: red;
    padding: 44px 0px 0 26px;
  }
  &:hover .dialog-title {
  color: #256f78;
}
}
.register-api-sircle {
  background-color: #5f84a2;
  width: 140px;
  height: 140px;
  margin: 50px 0 50px 150px;
  border-radius: 50%;
  position: absolute;
  left: 25%;
  top: -1%;
  cursor: pointer;
  &:hover div {
    color: #256f78;
  }
  div {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    color: #ffffff;
    margin-top: 46px;
  }
}

.third-circle{
  background-color: #5f84a2;
  width: 140px;
  height: 140px;
  margin: 50px 0 50px 150px;
  border-radius: 50%;
  position: absolute;
  left: 37%;
  top: 52%;
  cursor: pointer;
  &:hover div {
    color: #256f78;
  }
  div {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    color: #ffffff;
    margin-top: 46px;
  }
}

.four-circle{
  background-color: #5f84a2;
  width: 140px;
  height: 140px;
  margin: 50px 0 50px 150px;
  border-radius: 50%;
  position: absolute;
  left: 7%;
  top: 77%;
  cursor: pointer;
  &:hover div {
    color: #256f78;
  }
  div {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    color: #ffffff;
    margin-top: 46px;
  }
}

.v-card--link:focus:before {
     opacity: 0; 
}

</style>
