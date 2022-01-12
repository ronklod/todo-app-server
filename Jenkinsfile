pipeline {
    agent any

     tools {nodejs "nodejs"}

    stages {
        stage('pre-build') {
            steps {
                sh 'node --version'
                sh 'npm install'
                sh 'npm install forever -g'
            }
        }
        stage('build docker'){
            steps{
                sh 'docker build --tag jenkins-todo-app .'
            }
//             steps{
//                 script {
//                     try {
//                             sh 'forever stop bin/www'
//                         }
//                         catch (exc) {
//                             echo 'application not running'
//
//                     }
//                 }
//             }
        }
//         stage ('deoply docker'){
//             stage(
//                 sh 'docker run -p 8888:3001 --name jenkins-todo-app-test -d jenkins-todo-app'
//             )
//         }
//         stage('Starting a new App'){
//                     steps {
//                         sh 'forever start bin/www'
//
//                     }
//                 }
    }
}