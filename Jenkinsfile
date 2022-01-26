def image_name= "jenkins-todo-app:2.0"
def container_name =  "jenkins-todo-app-2"
def sqlContainer_name = "mssql_2019"

pipeline {
    agent any

    stages {
        stage ('Checking per-req services'){
                steps{
                    script{
                        def existingSQLContainer = sh script: "/Applications/Docker.app/Contents/Resources/bin/docker ps -a -q  -f name=$sqlContainer_name || echo error", returnStdout: true
                        echo "existing sql container:   $existingSQLContainer"

                        //if the sql container doesnt exists, we will fetch it.
                        if (existingSQLContainer == ""){
                               echo 'installing sql server'
                               def sqlserver_installed = sh script:  "/Applications/Docker.app/Contents/Resources/bin/docker pull mcr.microsoft.com/mssql/server:2019-latest || echo error" , returnStdout: true

                               if(sqlserver_installed != ""){
                                    echo 'starting the sql server'
                                    def sqlserver_is_starting = sh script:  "/Applications/Docker.app/Contents/Resources/bin/docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=sa_admin_1" -p 1433:1433 --name mssql_2019 -d mcr.microsoft.com/mssql/server:2019-latest"

                                    //checking that the sql server is running
                                    if(sqlserver_is_starting !=""){
                                        def sql_is_running  = sh script: "/Applications/Docker.app/Contents/Resources/bin/docker ps -q  -f name=$sqlContainer_name || echo error", returnStdout: true
                                        if(sql_is_running){
                                            echo 'sql server is running'
                                        }
                                    }

                               }

                        }
                    }
                }
        }
        stage ('Delete Old Containers and Images'){
            steps{
                script{
                    def existingContainer = sh script: "/Applications/Docker.app/Contents/Resources/bin/docker ps -a -q  -f name=$container_name || echo error", returnStdout: true
                    echo "existing container:   $existingContainer"

                    if (existingContainer != ""){
                        echo 'stopping running container....'
                        def stopped =  sh script:  "/Applications/Docker.app/Contents/Resources/bin/docker stop $container_name || echo error", returnStdout: true
                        echo 'deleting existing contaier....'
                        def delete_container = sh script: "/Applications/Docker.app/Contents/Resources/bin/docker rm $container_name || echo error", returnStdout: true
                        echo 'deleting the image....'
                        def delete_image = sh script: "/Applications/Docker.app/Contents/Resources/bin/docker rmi $image_name || echo error", returnStdout: true
                        echo "image deleted:  $delete_image"
                    }
                }
            }
        }
        stage('Building docker image'){
            steps{
                sh "/Applications/Docker.app/Contents/Resources/bin/docker build --tag $image_name . "
            }
        }
        stage('Running a docker container'){
            steps{
                sh "/Applications/Docker.app/Contents/Resources/bin/docker run -p 8082:3001 --name $container_name -d $image_name "
                echo 'browse to http://localhost:8082'
            }
        }
    }
}

