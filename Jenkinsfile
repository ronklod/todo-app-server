pipeline {
    agent any

     tools {nodejs "nodejs"}

    stages {
        stage('Build nodejs') {
            steps {
                sh 'node --version'
                sh 'npm install'
            }
        }
        stage('Build docker image'){
            steps{
                sh '/Applications/Docker.app/Contents/Resources/bin/docker build --tag jenkins-todo-app:2.0 .'
            }
        }
        stage('Run docker container'){
            steps{
                sh '/Applications/Docker.app/Contents/Resources/bin/docker run -p 8082:3001 --name jenkins-todo-app-2 -d jenkins-todo-app:2.0'
                //echo $PATH
                echo 'browse to http://localhost:8082'
            }
        }


    }
}