pipeline {
    agent any

     tools {nodejs "nodejs"}

    stages {
        stage('build') {
            steps {
                sh 'node --version'
                sh 'npm install'
                sh 'node install forever -g'
            }
        }
        stage('run'){
            steps {
                sh 'forever start ./bin/www'
            }
        }
    }
}