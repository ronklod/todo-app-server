def image_tag = jenkins-todo-app:2.0
def container_name =  jenkins-todo-app-2
pipeline {
    agent any

     tools {nodejs "nodejs"}

    stages {
//         stage('Build nodejs') {
//             steps {
//                 sh 'node --version'
//                 sh 'npm install'
//             }
//         }
        stage ('Delete Old Containers and Images'){
            steps{
                script{
                        //def existingContainer = sh script: '/Applications/Docker.app/Contents/Resources/bin/docker ps -a -q  -f name=jenkins-todo-app-2 || echo error', returnStdout: true
                        def existingContainer = sh script: '/Applications/Docker.app/Contents/Resources/bin/docker ps -a -q  -f name=$container_name || echo error', returnStdout: true
                        echo "existing container:   $existingContainer"
                        if (existingContainer != ""){

                            echo 'stopping running containers....'

                            def stopped =  sh script:  '/Applications/Docker.app/Contents/Resources/bin/docker stop $container_name || echo error', returnStdout: true

                            def delete_container = sh script: '/Applications/Docker.app/Contents/Resources/bin/docker rm $container_name || echo error', returnStdout: true

                            //if(stooped != ""){
                            def delete_image = sh script: '/Applications/Docker.app/Contents/Resources/bin/docker rmi jenkins-todo-app:2.0 || echo error', returnStdout: true
                            echo "deleted image:  $delete_image"
                            //}

                        }

                }
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


// x='ron'
// ret =''
// pipeline {
//     agent any
//
//     stages {
//         // stage('Hello') {
//         //     steps {
//
//         //         echo "$x"
//         //     }
//         // }
//         stage('Delete Old Containers and Images'){
//             steps{
//                 script{
//                     // def ret = "rrrr" // sh '$(/Applications/Docker.app/Contents/Resources/bin/docker ps -q  -f name=jenkins-todo-app-2) '
//                     // if (ret != ""){
//                     //     echo 'ron'
//                     // }
//                     // else{
//                     //     echo 'klod'
//                     // }
//                     def  y = sh script: '/Applications/Docker.app/Contents/Resources/bin/docker ps -a -q  -f name=jenkins-todo-app-2 || echo error', returnStdout: true
//                     if (y != ""){
//
//                         def stopped =  sh script:  '/Applications/Docker.app/Contents/Resources/bin/docker stop jenkins-todo-app-2 || echo error', returnStdout: true
//                         echo "xxxx + $y"
//
//
//                         def delete_container = sh script: '/Applications/Docker.app/Contents/Resources/bin/docker rm jenkins-todo-app-2 || echo error', returnStdout: true
//
//                         //if(stooped != ""){
//                             def delete_image = sh script: '/Applications/Docker.app/Contents/Resources/bin/docker rmi jenkins-todo-app:2.0 || echo error', returnStdout: true
//                             echo "deleted image: + $delete_image"
//                         //}
//
//                     }
//                 }
//
//             }
//         }
//         // stage('Build & run a new image and container'){
//         //     steps{
//         //         // script{
//         //         //     ///Applications/Docker.app/Contents/Resources/bin/docker run -p 8082:3001 --name jenkins-todo-app-2 -d jenkins-todo-app:2.0
//         //         //     sh script: '/Applications/Docker.app/Contents/Resources/bin/docker build --tag  jenkins-todo-app:2.0 . || echo error', returnStdout: true
//         //         //     sh script: '/Applications/Docker.app/Contents/Resources/bin/docker run -p 8082:3001 --name jenkins-todo-app-2 -d jenkins-todo-app:2.0  || echo error', returnStdout: true
//         //         // }
//         //         sh '/Applications/Docker.app/Contents/Resources/bin/docker build --tag jenkins-todo-app:2.0 .'
//
//         //     }
//         // }
//
//     }
// }
