def call() {
  sh """
    kubectl apply -f k8s/namespaces/
    kubectl apply -f k8s/config/
    kubectl apply -f k8s/services/
  """
  
  def serviceList = env.SERVICES.split(',')
  for (service in serviceList) {
    sh """
      kubectl set image deployment/${service}-service ${service}-service=${env.DOCKER_REGISTRY}/${env.DOCKER_ORG}/${service}-service:${params.build_version} -n ecommerce
    """
  }
}