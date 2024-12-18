pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = "your-registry.azurecr.io"
        DOCKER_CREDENTIALS_ID = "docker-cred-id"
        KUBERNETES_CREDENTIALS_ID = "k8s-cred-id"
        VERSION = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm run test'
            }
        }
        
        stage('Build and Push Docker Images') {
            parallel {
                stage('Cart Service') {
                    steps {
                        dir('services/cart') {
                            script {
                                docker.build("${DOCKER_REGISTRY}/cart-service:${VERSION}")
                                docker.withRegistry("https://${DOCKER_REGISTRY}", DOCKER_CREDENTIALS_ID) {
                                    docker.image("${DOCKER_REGISTRY}/cart-service:${VERSION}").push()
                                }
                            }
                        }
                    }
                }
                
                stage('Payment Service') {
                    steps {
                        dir('services/payment') {
                            script {
                                docker.build("${DOCKER_REGISTRY}/payment-service:${VERSION}")
                                docker.withRegistry("https://${DOCKER_REGISTRY}", DOCKER_CREDENTIALS_ID) {
                                    docker.image("${DOCKER_REGISTRY}/payment-service:${VERSION}").push()
                                }
                            }
                        }
                    }
                }
                
                stage('Request Service') {
                    steps {
                        dir('services/request') {
                            script {
                                docker.build("${DOCKER_REGISTRY}/request-service:${VERSION}")
                                docker.withRegistry("https://${DOCKER_REGISTRY}", DOCKER_CREDENTIALS_ID) {
                                    docker.image("${DOCKER_REGISTRY}/request-service:${VERSION}").push()
                                }
                            }
                        }
                    }
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: KUBERNETES_CREDENTIALS_ID]) {
                    sh """
                        kubectl apply -f k8s/namespaces/
                        kubectl apply -f k8s/config/
                        kubectl apply -f k8s/services/
                        kubectl set image deployment/cart-service cart-service=${DOCKER_REGISTRY}/cart-service:${VERSION} -n ecommerce
                        kubectl set image deployment/payment-service payment-service=${DOCKER_REGISTRY}/payment-service:${VERSION} -n ecommerce
                        kubectl set image deployment/request-service request-service=${DOCKER_REGISTRY}/request-service:${VERSION} -n ecommerce
                    """
                }
            }
        }
    }
    
    post {
        success {
            slackSend(color: 'good', message: "Build Successful: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
        failure {
            slackSend(color: 'danger', message: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
    }
}