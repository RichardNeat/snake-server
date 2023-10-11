echo "setting up local docker container"
docker run -d --name snake -p 27017:27017 mongo:latest