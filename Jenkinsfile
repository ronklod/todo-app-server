pipeline {
    agent any

     tools {nodejs "nodejs"}

    stages {
        stage('pre-build') {
            steps {
                sh 'node --version'
                sh 'npm install'
            }
        }
        stage('build docker'){
            steps{
                //sh '/Applications/Docker.app/Contents/Resources/bin/docker images'
                sh '/Applications/Docker.app/Contents/Resources/bin/docker build --tag jenkins-todo-app'
                //echo $PATH
                //sh 'docker build --tag jenkins-todo-app .'
            }
        }

    }
}