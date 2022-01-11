pipeline {
    agent any

     tools {nodejs "nodejs"}

    stages {
        stage('build') {
            steps {
                sh 'node --version'
                sh 'npm install'
                sh 'npm i forever'
            }
        }
        stage('run'){
            steps {
                sh 'forever npm start'
            }
        }
    }
}