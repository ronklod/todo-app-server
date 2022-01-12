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
                //sh '/Applications/Docker.app/Contents/Resources/bin/docker build --tag jenkins-todo-app .'
                //echo $PATH
                //sh 'docker build --tag jenkins-todo-app .'
            }
        }
        stage('run docker'){
            steps{
                sh '/Applications/Docker.app/Contents/Resources/bin/docker run -p 8082:3001 --name jenkins-todo-app -d jenkins-todo-app'
                //echo $PATH
                //sh 'docker build --tag jenkins-todo-app .'
            }
        }


    }
}