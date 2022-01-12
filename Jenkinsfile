pipeline {
    agent any

     tools {nodejs "nodejs"}

    stages {
        stage('pre-build') {
            steps {
                sh 'node --version'
                //sh 'npm install'
            }
        }
//         stage('build docker'){
//             steps{
//                 //echo $PATH
//                 //sh 'docker build --tag jenkins-todo-app .'
//             }
//         }

    }
}