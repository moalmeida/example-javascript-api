#!groovy
pipeline {
  agent any
  tools { nodejs 'node8' }
  stages {
      stage('Checkout') {
        steps {
          checkout scm
        }
      }
      stage('Dependencies') {
        steps {
          sh 'npm install'
        }
      }
      stage('Code Scan') {
        steps {
          sh 'npm run lint'
        }
      }
      stage('Unit Test') {
        steps {
          // env.NODE_ENV = "test"
          sh 'npm test'
        }
      }
      stage('Integration Test') {
        steps {
          // env.NODE_ENV = "test"
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
