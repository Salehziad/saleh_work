<template>
  <v-card class="login-section">
    <div class="d-flex flex-column justify-center card-title">
      <v-card-title class="">Welcome to API Gateway </v-card-title>
      <v-card-title class="">Managment</v-card-title>
    </div>
    <div class="d-flex flex-column justify-center card-description">
      <v-card-text class="card-description-all"
        >Enter your username and</v-card-text
      >
      <v-card-text class="card-description-all second-description"
        >password to login to our website</v-card-text
      >
    </div>
    <div class="input-fields">
      <v-card-text class="username-input">Username</v-card-text>
      <v-text-field v-model="username" filled outlined="" required />
      <v-card-text class="password-input">Password</v-card-text>
      <v-text-field
        v-model="password"
        filled
        :type="showPassword ? 'text' : 'password'"
        outlined=""
        required
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
      />
      <v-btn
        class="login-btn"
        :loading="loading4"
        :disabled="loading4"
        color="#194569"
        @click="loader = 'loading4'"
        >Login</v-btn
      >
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      loading4: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.login-section {
  top: 164px;
  left: 1250px;
  width: 540px;
  height: 635px;
}
.card-title {
  align-items: center;
  padding-top: 20px;
}

.card-title :nth-child(1) {
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 48px;
  text-align: center;

  color: #000000;
  /* margin-top: -20px; */
}
.card-title :nth-child(2) {
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 48px;
  text-align: center;

  color: #000000;
  margin-top: -30px;
}
.card-description {
  align-items: center;
  margin-top: 20px;
  margin-left: 0px;
  font-size: 25px;
}
.card-description-all {
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  color: #5b5b5b;
  margin-top: -20px;
}
.second-description {
  margin-top: -30px;
}
.input-fields {
  margin-top: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  margin-left: 83px;
  padding-right: 25px;
}
.username-input {
  margin-top: -25px;
  margin-left: -142px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #000000;
}
.password-input {
  margin-top: -25px;
  margin-left: -143px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #000000;
}
.login-btn {
  color: white;
  font-size: 16px;
  width: 100px;
  margin: 40px 0 0 135px;
}
.v-card--link:focus:before {
  opacity: 0;
}
</style>
