#!groovy

pipeline {

  agent any
  
  tools { nodejs 'node8' }
  
  stages {

      stage('Checkout') {
        steps {
          git(url: 'https://github.com/moalmeida/example-javascript-api', branch: 'master', credentialsId: 'github-authentication', changelog: true, poll: true)
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
