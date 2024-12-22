#!/usr/bin/env groovy

def login(String credentialsId) {
    withCredentials([usernamePassword(credentialsId: credentialsId, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
        sh """
            echo "\${DOCKER_PASSWORD}" | docker login -u "\${DOCKER_USERNAME}" --password-stdin
        """
    }
}

def buildAndPush(String service, String version, String dockerOrg) {
    def imageTag = "${dockerOrg}/${service}-service:${version}"
    sh """
        docker build -t ${imageTag} .
        docker push ${imageTag}
    """
}

def logout() {
    sh 'docker logout'
}

return this
