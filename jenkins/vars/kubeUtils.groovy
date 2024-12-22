#!/usr/bin/env groovy

def setupConfig(String credentialsId) {
    withCredentials([file(credentialsId: credentialsId, variable: 'KUBECONFIG')]) {
        sh """
            mkdir -p ~/.kube
            cp "\${KUBECONFIG}" ~/.kube/config
            chmod 600 ~/.kube/config
        """
    }
}

def deploy(String service, String version, String dockerOrg) {
    sh """
        kubectl set image deployment/${service}-service ${service}-service=${dockerOrg}/${service}-service:${version} -n ecommerce
    """
}

def cleanup() {
    sh 'rm -f ~/.kube/config'
}

return this
