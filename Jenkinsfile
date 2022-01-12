pipeline {
    agent any

     tools {nodejs "nodejs"}

    stages {
        stage('Build') {
            steps {
                sh 'node --version'
                sh 'npm install'
                sh 'npm install forever -g'
            }
        }
        stage('Stopping an Exisitng running App'){
            steps {
                sh 'forever stop /bin/www'

            }
        }
        stage('Starting a new App'){
                    steps {
                        sh 'forever start /bin/www'

                    }
                }
    }
}