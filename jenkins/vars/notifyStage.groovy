def call(String buildStatus) {
  def subject = "${buildStatus}: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
  def body = """
    Build: ${env.JOB_NAME} #${env.BUILD_NUMBER}
    Status: ${buildStatus}
    Details: ${env.BUILD_URL}
  """
  
  emailext(
    subject: subject,
    body: body,
    to: env.NOTIFICATION_EMAILS,
    recipientProviders: [[$class: 'DevelopersRecipientProvider']]
  )
}