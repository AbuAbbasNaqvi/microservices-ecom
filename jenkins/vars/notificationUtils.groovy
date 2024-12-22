#!/usr/bin/env groovy

def sendBuildNotification(String status) {
    def subject = "${status}: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
    def body = """
        Build ${status.toLowerCase()}
        Job: ${env.JOB_NAME}
        Build Number: ${env.BUILD_NUMBER}
        Build URL: ${env.BUILD_URL}
    """
    
    emailext(
        subject: subject,
        body: body,
        to: env.EMAIL_RECIPIENTS ?: 'abuabbasali786@gmail.com',
        recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    )
}

return this
