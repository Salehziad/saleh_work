`pipeline {
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