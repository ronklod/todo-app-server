pipeline {
    agent any

     tools {nodejs "nodejs"}

    stages {
        stage('build') {
            steps {
                sh 'node --version'
                sh 'npm install'

            }
        }
        stage('run'){
            steps {
                sh 'forever start'
            }
        }
    }
}