<template>
  <v-row justify="center">
    <v-dialog v-model="createDilog" persistent max-width="600px">
      <v-form>
      <v-card>
        <v-card-text>
          <v-container>
            <v-row class="mt-4">
              <v-col class="d-flex" cols="12" sm="7">
                <v-select
                  class="ml-3"
                  :items="features"
                  v-model="feature"
                  label="Features"
                  required
                  outlined
                ></v-select>
              </v-col>

              <v-col class="d-flex" cols="12" sm="5">
                <v-select
                  class="mr-3"
                  :items="releases"
                  label="Releases"
                  v-model="release"
                  outlined
                ></v-select>
              </v-col>
            </v-row>

            <v-checkbox
              class="ml-2 eco-system-input"
              v-model="ecoSystem"
              label="Eco-system"
              :value="false"
            ></v-checkbox>

            <v-col>
              <div class="eco-system">
                <div class="eco-system-radio">
                  <h3 class="mt-5 ml-6">Mode:</h3>
                  <v-container class="ml-15 mode">
                    <v-radio-group v-model="mode" row>
                      <v-radio
                        label="cluster"
                        value="cluster"
                        class="ml-4"
                      ></v-radio>
                      <v-radio
                        label="fork"
                        value="fork"
                        class="ml-10"
                      ></v-radio>
                    </v-radio-group>
                  </v-container>
                </div>
                <div class="d-flex justify-center instance">
                  <h3 class="mt-7 instance-title">Number of Instances :</h3>

                  <v-col class="d-flex" cols="12" sm="5">
                    <v-select
                      :readonly="mode === 'fork'"
                      :items="instances"
                      label="instance"
                      outlined
                      v-model="instance"
                    ></v-select>
                  </v-col>
                </div>
                <div class="d-flex justify-center server-path">
                  <h3 class="mt-7">Server Directory :</h3>
                  <v-col class="d-flex" cols="12" sm="8">
                    <v-text-field
                      width="100px"
                      label="Server Directory"
                      :placeholder="serverDirectory"
                      v-model="serverDirectory"
                      outlined
                    ></v-text-field>
                  </v-col>
                </div>
              </div>
            </v-col>

            <v-checkbox
              class="ml-2 mt-4 m-b-0 Jenkins"
              v-model="Jenkins"
              label="Jenkins"
              :value="false"
            ></v-checkbox>

            <v-col class="mt-0">
              <div class="eco-system">
                <h3 class="mt-5 ml-6">Targeted Server :</h3>
                <div class="d-flex justify-sm-space-around">
                  <v-checkbox
                    class="ml-6"
                    v-model="development"
                    label="Development"
                    :value="false"
                  ></v-checkbox>
                  <v-checkbox
                    class="ml-1"
                    v-model="preProduction"
                    label="Pre-production"
                    :value="false"
                  ></v-checkbox>
                </div>
                <div class="d-flex justify-sm-space-around">
                  <v-checkbox
                    v-model="testing"
                    label="Testing"
                    :value="false"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="production"
                    label="Production"
                    :value="false"
                  ></v-checkbox>
                </div>

                <h3 class="ml-6">Generate For :</h3>
                <div class="d-flex justify-sm-space-around">
                  <v-checkbox
                    class="ml-1"
                    v-model="backend"
                    label="Backend"
                    :value="false"
                  ></v-checkbox>
                  <v-checkbox
                    class="mr-3"
                    v-model="frontend"
                    label="Frontend"
                    :value="false"
                  ></v-checkbox>
                </div>
              </div>
            </v-col>
          </v-container>
        </v-card-text>

        <v-card-actions class="btns-container pb-5">
          <v-btn outlined color="" @click="closeDialog">Cancel </v-btn>
          <v-btn
            :disabled="validata === false"
            color="primary"
            dark
            @click="generateFiles"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    createDilog: {
      type: Boolean,
    },
  },
  data() {
    return {
      dialog: this.createDilog,
      notifications: false,
      sound: true,
      widgets: false,
      features: [
        'Services',
        'Providers',
        'Tasks',
        'Appointments',
        'Marketing',
        'Knowledagebase',
        'Billing',
        'Consumers',
        'Inventory',
        'Notifications',
        'Facilities',
        'Performance',
        'Incidents',
        'Suppliers',
        'Clinicdashboard',
        'Communities',
        'Human Resources',
        'Appointmentprocess',
        'Establishment',
        'Ciam',
        'Reports',
        'Lookups',
        'Cron Jobs',
        'Documnet Management System',
      ],
      feature: null,
      releases: ['Release_1', 'Release_2', 'Release_3', 'Release_4'],
      release: null,
      ecoSystem: null,
      cluster: null,
      fork: null,
      instances: [1, 2, 3, 4, 5, 6, 7, 'Max'],
      instance: 1,
      Jenkins: null,
      development: null,
      preProduction: null,
      testing: null,
      production: null,
      backend: null,
      frontend: null,
      serverDirectory: null,
      mode: 'cluster',
      validata: false,
    }
  },
  computed:{
    check(){
      return [this.release, this.feature,this.ecoSystem,this.Jenkins]
    }
  },
  methods: {
    closeDialog() {
      this.dialog = !this.dialog
      this.$emit('close-dialog', this.dialog)
    },
    generateFiles() {
      // console.log(this.feature)
      if (this.ecoSystem) {
        if (this.mode === 'fork') {
          this.download(
            'ecosystem.config.js',
            `module.exports = { apps: [{name: "api.${this.feature}.agentsoncloud.com_${this.release}" ,script: "${this.serverDirectory}",instances :"1",exec_mode : "${this.mode}"}]}`
          )
        }
        this.download(
          'ecosystem.config.js',
          `module.exports = { apps: [{name: "api.${this.feature}.agentsoncloud.com_${this.release}" ,script: "${this.serverDirectory}",instances :"${this.instance}",exec_mode : "${this.mode}"}]}`
        )
      }
      if (this.Jenkins) {
        if (this.testing) {
          let file = `pipeline {
    agent any
      options {
        ansiColor('xterm')
    }

    stages {
        stage('Pre Build') {
            steps {
                sshPublisher(
                    continueOnError: false, failOnError: true,
                    publishers: [
                    sshPublisherDesc(
                        configName: "test server",
                        verbose: true,
                        transfers: [
                        sshTransfer(
                            execCommand: "cd /var/www/ && rm -rf api.${this.feature}.agentsoncloud.com_${this.release}"
                        ),
                        sshTransfer(
                            execCommand: "cd /var/www/ && mkdir api.${this.feature}.agentsoncloud.com_${this.release}"
                        )
                    ])
                ])
            }
        }
        stage('Build') {
            steps {
                sshPublisher(
                    continueOnError: false, failOnError: true,
                    publishers: [
                    sshPublisherDesc(
                        configName: "test server",
                        verbose: true,
                        transfers: [
                        sshTransfer(
                            sourceFiles: "**/*",
                            remoteDirectory: "api.${this.feature}.agentsoncloud.com_${this.release}",
                            execCommand: "cd /var/www/api.${this.feature}.agentsoncloud.com_${this.release} && npm i"
                        )
                    ])
                ])
            }
        }

        stage('Test') {
            steps {
                echo("Test Stage")
            }
        }

        stage('Deploy') {
            steps {
                sshPublisher(
                    continueOnError: false, failOnError: true,
                    publishers: [
                    sshPublisherDesc(
                        configName: "test server",
                        verbose: true,
                        transfers: [
                        // change it with anas env 
                        // sshTransfer(
                        //        execCommand: "pm2 delete api.${this.feature}.agentsoncloud.com_${this.release}"
                        //        ),
                        sshTransfer(
                            execCommand: "cd /var/www/api.${this.feature}.agentsoncloud.com_${this.release} && pm2 start "
                        )
                    ])
                ])
            }
        }
    }

     post {
        always {
           slackSend channel: "#testing-jenkins", message: "$\{env.JOB_NAME} - #$\{env.BUILD_NUMBER} : Started . ", color: "good"
        }
        success {
          slackSend channel: "#testing-jenkins", message: "$\{env.JOB_NAME} - #$\{env.BUILD_NUMBER} : Build Finshed Success . ", color: "good"
        }
        unstable {
           slackSend channel: "#testing-jenkins", message: "$\{env.JOB_NAME} - #$\{env.BUILD_NUMBER} : Build have Error  . ", color: "warning"
        }
        failure {
            slackSend channel: "#testing-jenkins", message: "$\{env.JOB_NAME} - #$\{env.BUILD_NUMBER} : Failure Build  . ", color: "danger"
        }
        changed {
             echo 'Things were different before...'
        }
    }
}`
          this.download('Jenkinsfile_Test.js', file)
        }
        if (this.development) {
          let file = `pipeline {
    agent any
      options {
        ansiColor('xterm')
    }
    stages {
         stage('Pre Build') {
            steps {
            sshPublisher(
            continueOnError: false, failOnError: true,
            publishers: [
                sshPublisherDesc(
                configName: "dev server",
                verbose: true,
                transfers: [
                    sshTransfer(
                 
                        execCommand:"cd /var/www/ && rm -rf api.${this.feature}.agentsoncloud.com_${this.release}"
                )
             ])
            ])
            }
        }
        
         stage('Build') {
            steps {
            sshPublisher(
            continueOnError: false, failOnError: true,
            publishers: [
                sshPublisherDesc(
                configName: "dev server",
                verbose: true,
                transfers: [
                    sshTransfer(
                        sourceFiles: "**/*",
                        remoteDirectory: "api.${this.feature}.agentsoncloud.com_${this.release}",
                        execCommand:"cd /var/www/api.${this.feature}.agentsoncloud.com_${this.release} && npm i"
                )
             ])
            ])
            }
        }
        
        stage('Test') {
            steps {
                echo ("Test Stage")
            }
        }
        stage('Deploy') {
            steps {
                
                 sshPublisher(
            continueOnError: false, failOnError: true,
            publishers: [
                sshPublisherDesc(
                configName: "dev server",
                verbose: true,
                transfers: [
                            sshTransfer(
                        execCommand: " pm2 delete  api.${this.feature}.agentsoncloud.com_${this.release}"
                         ),
               sshTransfer(
                        execCommand: "cd /var/www/api.${this.feature}.agentsoncloud.com_${this.release} && pm2 start "
                         )
                ])
            ])
            }
        }
    }
     post {
        always {
           slackSend channel: "#development-jenkins", message: "$\{env.JOB_NAME} - #$\{env.BUILD_NUMBER} : Started . ",color:"good"
        }
        success {
          slackSend channel: "#development-jenkins", message: "$\{env.JOB_NAME} - #$\{env.BUILD_NUMBER} : Build Finshed Success . ",color:"good"
        }
        unstable {
           slackSend channel: "#development-jenkins", message: "$\{env.JOB_NAME} - #$\{env.BUILD_NUMBER} : Build have Error  . ", color:"warning"
        }
        failure {
            slackSend channel: "#development-jenkins", message: "$\{env.JOB_NAME} - #$\{env.BUILD_NUMBER} : Failure Build  . ",color:"danger"
        }
        changed {
             echo 'Things were different before...'
        }
    }
}`
          this.download('Jenkinsfile_Development.js', file)
        }
        if (this.production) {
          let file = `pipeline {
    agent any
      options {
        ansiColor('xterm')
    }
    stages {
         stage('Pre Build') {
            steps {
            sshPublisher(
            continueOnError: false, failOnError: true,
            publishers: [
                sshPublisherDesc(
                configName: "production server",
                verbose: true,
                transfers: [
                    sshTransfer(
                        execCommand:"cd /var/www/ && rm -rf api.${this.feature}.com_${this.release}"
                ),
                sshTransfer(
                        execCommand:"cd /var/www/ && mkdir api.${this.feature}.com_${this.release}"
                )
             ])
            ])
            }
        }
         stage('Build') {
            steps {
            sshPublisher(
            continueOnError: false, failOnError: true,
            publishers: [
                sshPublisherDesc(
                configName: "production server",
                verbose: true,
                transfers: [
                    sshTransfer(
                        sourceFiles: "**/*",
                        remoteDirectory: "api.${this.feature}.com_${this.release}",
                        execCommand:"cd /var/www/api.${this.feature}.com_${this.release} && npm i"
                )
             ])
            ])
            }
        }
        
        stage('Test') {
            steps {
                echo ("Test Stage")
            }
        }
        
        stage('Deploy') {
            steps {
             sshPublisher(
            continueOnError: false, failOnError: true,
            publishers: [
                sshPublisherDesc(
                configName: "production server",
                verbose: true,
                transfers: [
               // change it with anas env 
               // sshTransfer(
               //        execCommand: "pm2 delete api.${this.feature}.agentsoncloud.com_${this.release}"
               //        ),
               sshTransfer(
                        execCommand: "cd /var/www/api.${this.feature}.com_${this.release} && pm2 start "
                         )
                ])
            ])
            }
        }
    }
     post {
        always {
           slackSend channel: "production-jenkins", message: "$\{env.JOB_NAME} - #$\{env.BUILD_NUMBER} : Started . ",color:"good"
        }
        success {
          slackSend channel: "production-jenkins", message: "$\{env.JOB_NAME} - #$\{env.BUILD_NUMBER} : Build Finshed Success . ",color:"good"
        }
        unstable {
           slackSend channel: "production-jenkins", message: "$\{env.JOB_NAME} - #$\{env.BUILD_NUMBER} : Build have Error  . ", color:"warning"
        }
        failure {
            slackSend channel: "production-jenkins", message: "$\{env.JOB_NAME} - #$\{env.BUILD_NUMBER} : Failure Build  . ",color:"danger"
        }
        changed {
             echo 'Things were different before...'
        }
    }
}`
          this.download('Jenkinsfile_Prod.js', file)
        }
        if (this.preProduction) {
          let file = `pipeline {
    agent any
      options {
        ansiColor('xterm')
    }
    stages {
         stage('Pre Build') {
            steps {
            sshPublisher(
            continueOnError: false, failOnError: true,
            publishers: [
                sshPublisherDesc(
                configName: "preprod server",
                verbose: true,
                transfers: [
                    sshTransfer(
                        execCommand:"cd /var/www/ && rm -rf api.${this.feature}.agentsoncloud.com_${this.release}"
                ),
                sshTransfer(
                        execCommand:"cd /var/www/ && mkdir api.${this.feature}.agentsoncloud.com_${this.release}"
                )
             ])
            ])
            }
        }
         stage('Build') {
            steps {
            sshPublisher(
            continueOnError: false, failOnError: true,
            publishers: [
                sshPublisherDesc(
                configName: "preprod server",
                verbose: true,
                transfers: [
                    sshTransfer(
                        sourceFiles: "**/*",
                        remoteDirectory: "api.${this.feature}.agentsoncloud.com_${this.release}",
                        execCommand:"cd /var/www/api.${this.feature}.agentsoncloud.com_${this.release} && npm i"
                )
             ])
            ])
            }
        }
        
        stage('Test') {
            steps {
                echo ("Test Stage")
            }
        }
        
        stage('Deploy') {
            steps {
             sshPublisher(
            continueOnError: false, failOnError: true,
            publishers: [
                sshPublisherDesc(
                configName: "preprod server",
                verbose: true,
                transfers: [
               sshTransfer(
                        execCommand: "cd /var/www/api.${this.feature}.agentsoncloud.com_${this.release}\ && pm2 start "
                         )
                ])
            ])
            }
        }
    }
     post {
        always {
           slackSend channel: "pre-production-jenkins", message: "$\{env.JOB_NAME} - #$\{env.BUILD_NUMBER} : Started . ",color:"good"
        }
        success {
          slackSend channel: "pre-production-jenkins", message: "$\{env.JOB_NAME} - #$\{env.BUILD_NUMBER} : Build Finshed Success . ",color:"good"
        }
        unstable {
           slackSend channel: "pre-production-jenkins", message: "$\{env.JOB_NAME} - #$\{env.BUILD_NUMBER} : Build have Error  . ", color:"warning"
        }
        failure {
            slackSend channel: "pre-production-jenkins", message: "$\{env.JOB_NAME} - #$\{env.BUILD_NUMBER} : Failure Build  . ",color:"danger"
        }
        changed {
             echo 'Things were different before...'
        }
    }
}`
          this.download('Jenkinsfile_PreProd', file)
        }
      }
      this.dialog = !this.dialog
      this.$emit('close-dialog', this.dialog)
    },
    download(filename, text) {
      console.log('done')
      let element = document.createElement('a')
      element.setAttribute("href", "data:./plain;charset=utf-8," + text);
      console.log(element)
      element.setAttribute('download', filename)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
  },
  watch: {
    check(){
      if(this.feature&&this.release){
        this.validata=true
        if(this.feature&&this.release&&this.ecoSystem){
          this.validata=true
        }
        else if(this.feature&&this.release&&this.Jenkins){
          this.validata=true
        }
      }
    }
    
  },
}
</script>

<style scoped>
.eco-system {
  border: 1px solid#808080;
  padding: 5px;
  margin-top: -30px;
  margin-bottom: -20px;
  margin-left: 1px;
}
.eco-system-input {
  margin-top: -25px;
}
.eco-system-radio {
  display: flex;
  margin-left: 5px;
}
.eco-system .mode {
  /* height: 20px; */
  margin-top: -12px;
}
.instance {
  margin-top: -18px;
}
.instance-title {
  margin-left: -50px;
}
.server-path {
  margin-top: -20px;
  margin-bottom: -15px;
}
.btns-container {
  display: flex;
  justify-content: space-around;
  /* margin-bottom: 20px; */
  /* padding-top: 30px; */
}
.btns-container button {
  width: 150px;
  height: 61px;
  background: #ffffff;
  border: 1px solid #808080;
}
</style>
