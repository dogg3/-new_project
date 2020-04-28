#!/bin/bash
# build script


PROJECT_ID="footballproject-85cd9"

echo "Building gcr.io/footballproject-85cd9/frontend docker image from Dockerfile"
echo "What version?"

#Get version from standard input
read VERSION

##Build image
docker build -t gcr.io/${PROJECT_ID}/frontend:${VERSION} .


#Push the docker image to gcloud registry
docker push gcr.io/${PROJECT_ID}/frontend:${VERSION}

#set new image and deploy
kubectl set image deployment/football-frontend-react-web frontend=gcr.io/${PROJECT_ID}/frontend:${VERSION}

