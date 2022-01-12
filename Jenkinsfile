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
        stage('build docker'){
            steps{
                sh '/Applications/Docker.app/Contents/Resources/bin/docker images'
                //echo $PATH
                //sh 'docker build --tag jenkins-todo-app .'
            }
        }

    }
}