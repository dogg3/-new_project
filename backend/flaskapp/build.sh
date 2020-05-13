#bash
echo "building"
docker-compose build --no-cache


echo "Push the backendflask image to google container registry"
docker push gcr.io/footballproject-85cd9/backendflask:latest


echo "Push the nginx image to google container registry"
docker push gcr.io/footballproject-85cd9/backendnginx:latest



echo "Update the container image on the deployment"
kubectl set image deployment/footyphi flask=gcr.io/footballproject-85cd9/backendflask:latest
kubectl set image deployment/footyphi nginx=gcr.io/footballproject-85cd9/backendnginx:latest
