pipeline {
    agent { docker { image 'node:17.3.0' } }
    stages {
        stage('build') {
            steps {
                sh 'node --version'
            }
        }
    }
}
