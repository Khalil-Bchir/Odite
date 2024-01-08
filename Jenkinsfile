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
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t $DOCKERHUB_CREDENTIALS_USR/server-side:$BUILD_ID ./server-side'
                sh 'docker build -t $DOCKERHUB_CREDENTIALS_USR/client-side:$BUILD_ID ./client-side'
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
