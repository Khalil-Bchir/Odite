pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dh_cred')
    }

    triggers {
        pollSCM('*/5 * * * *') 
    }

    stages {
        stage('Checkout') {
            agent any
            steps {
                checkout scm
            }
        }

        stage('Initialization') {
            steps {
                sh 'mkdir -p $HOME/.docker'
                sh 'echo "{\"auths\":{\"https://index.docker.io/v1/\":{\"auth\":\"${DOCKERHUB_CREDENTIALS}\"}}}" > $HOME/.docker/config.json'
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Build') {
            steps {
                script {
                    // Print the current workspace directory to verify its location
                    echo "Current workspace: ${pwd()}"
                    
                    // Build server-side image with tag latest
                    dir('AudiTech-server-side') {
                        sh 'docker build -t khalilbchir/server-side:latest .'
                    }
        
                    // Build client-side image with tag latest
                    dir('AudiTech-client-side') {
                        sh 'docker build -t khalilbchir/client-side:latest .'
                    }
                }
            }
        }



        stage('Deliver') {
            steps {
                sh 'docker push $DOCKERHUB_CREDENTIALS_USR/server-side:$BUILD_ID'
                sh 'docker push $DOCKERHUB_CREDENTIALS_USR/client-side:$BUILD_ID'
            }
        }

        stage('Kubernetes Deployment') {
            steps {
                sh 'kubectl apply -f kubernetes/server-deployment.yaml'
                sh 'kubectl apply -f kubernetes/server-service.yaml'

                sh 'kubectl apply -f kubernetes/client-deployment.yaml'
                sh 'kubectl apply -f kubernetes/client-service.yaml'
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker rmi $DOCKERHUB_CREDENTIALS_USR/server-side:$BUILD_ID'
                sh 'docker rmi $DOCKERHUB_CREDENTIALS_USR/client-side:$BUILD_ID'
                sh 'docker logout'
            }
        }
    }
}
