#bash
echo "building"
docker build -t gcr.io/footballproject-85cd9/backendflask ./flask/


echo "Push the image to google container registry"
docker push gcr.io/footballproject-85cd9/backendflask


echo "Update the container image on the deployment"
kubectl set image deployment/flask flask=gcr.io/footballproject-85cd9/backendflask
