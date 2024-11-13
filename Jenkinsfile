pipeline {
    agent any

    environment {
        IMAGE_NAME = 'nginx:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    // Check if there are any existing containers to stop and remove
                    sh '''
                    if [ "$(docker ps -a -q)" ]; then
                        echo "Stopping and removing existing containers..."
                        docker-compose down
                    else
                        echo "No containers to stop or remove."
                    fi
                    
                    # Build the Docker image using docker-compose
                    echo "Building Docker image using docker-compose..."
                    docker-compose build
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Run the containers in detached mode
                    echo "Deploying containers using docker-compose..."
                    sh 'docker-compose up -d'
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    // Clean up unused resources
                    echo "Cleaning up unused images and containers..."
                    sh 'docker system prune -f'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up and stopping any containers...'
            // Optional: Cleanup containers after the pipeline execution.
            sh 'docker-compose down'
        }
    }
}
