def call() {
  def serviceList = env.SERVICES.split(',')
  for (service in serviceList) {
    dir("services/${service}") {
      def imageTag = "${env.DOCKER_REGISTRY}/${env.DOCKER_ORG}/${service}-service:${params.build_version}"
      sh "docker build -t ${imageTag} ."
      withDockerRegistry([credentialsId: env.REGISTRY_CREDS_ID, url: "https://${env.DOCKER_REGISTRY}"]) {
        sh "docker push ${imageTag}"
      }
    }
  }
}