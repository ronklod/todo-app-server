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
            step{
                try {
                            sh 'forever stop /bin/www'
                    }
                    catch (exc) {
                        echo 'application not running'

                }
            }
        }
        stage('Starting a new App'){
                    steps {
                        sh 'forever start /bin/www'

                    }
                }
    }
}