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
                sh '/Applications/Docker.app/Contents/Resources/bin/docker build --tag jenkins-todo-app .'
            }
        }
        stage('Run docker container'){
            steps{
                sh '/Applications/Docker.app/Contents/Resources/bin/docker run -p 8082:3001 --name jenkins-todo-app -d jenkins-todo-app'
                //echo $PATH
                echo 'browse to http://localhost:8082'
            }
        }


    }
}