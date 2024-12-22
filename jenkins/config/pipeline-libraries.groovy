// Shared pipeline functions
def dockerBuild(String service, String version) {
    def imageTag = "${env.DOCKER_ORG}/${service}-service:${version}"
    sh """
        docker build -t ${imageTag} .
        docker push ${imageTag}
    """
}

def kubernetesUpdate(String service, String version) {
    sh """
        kubectl set image deployment/${service}-service ${service}-service=${env.DOCKER_ORG}/${service}-service:${version} -n ecommerce
    """
}

return this