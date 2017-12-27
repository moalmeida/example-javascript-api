pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git(url: 'https://github.com/moalmeida/example-javascript-api', branch: 'master', credentialsId: 'github-authentication', changelog: true, poll: true)
      }
    }
    stage('Code Scan') {
      steps {
        sh 'echo ""'
      }
    }
    stage('Unit Test') {
      steps {
        sh 'echo ""'
      }
    }
    stage('Integration Test') {
      steps {
        sh 'echo ""'
      }
    }
    stage('Build') {
      steps {
        sh 'echo ""'
      }
    }
    stage('Publish') {
      steps {
        sh 'echo ""'
      }
    }
    stage('Deploy') {
      steps {
        sh 'echo ""'
      }
    }
  }
}
