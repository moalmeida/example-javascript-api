pipeline {
  agent any
  node { tool 'node8' }
  stages {
    stage('Checkout') {
      steps {
        git(url: 'https://github.com/moalmeida/example-javascript-api', branch: 'master', credentialsId: 'github-authentication', changelog: true, poll: true)
      }
      steps {
        sh 'npm install'
      }
    }
    stage('Code Scan') {
      steps {
        sh 'npm lint'
      }
    }
    stage('Unit Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Integration Test') {
      steps {
        sh 'npm test'
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
