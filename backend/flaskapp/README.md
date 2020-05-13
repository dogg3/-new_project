# Footyphi

- Douglas Landvik
- City University of London
- Part of third year undergrad project.

## Description


A flask application to serve as an API for processed footballs rankings and statisitics. The app is hosted on google cloud kubernetes in a container, which is using a containerized nginx as proxy server. 

http://footyphi.com is the endpoint for the appication

http://footyphi.com/api-doc is endpoint for documentaiton for the API. 

The simple one page to convey infromation about the applicaiton is set up of a html5 template created by https://html5up.net/. The template is under the
'Creative Commons Attribution 3.0 License'. That means the template can be usde for personal and comerical use but needs to keep the acknowledge of the source. It is done by keeping the 'html5up' tag in the footer of the webpage.




## Prerequiste

python
pipenv

## Installation

- Navigate to the flask directory and type ```pipenv install``` to install all dependencies
- Run a pipenv virutal environment by typing ```pipenv shell``` 
-  Last, but not least navigate run ```python run.py``` to run the application locally 
- To look at the code, just open up the project in your favorite code editor!


# Miscellaneous

### Testing
An openapi file called apidoc.yaml is under the root folder of the project. Import the file to desired api endpoint tester such as swagger or postman to test the endpoints. Reference the http://footyphi.com/api-doc for documentaiton for the API. 





### Dependencies
```py
    flask = "*"
    debug = "*"
    pytest = "*"
    coverage = "*"
    jupyter = "*"
    pandas = "*"
    matplotlib = "*"
    numpy = "*"
    sklearn = "*"
    flask-restful = "*"
    uwsgi = "*"
```



# Production


The application is deployed on google clouds kuberentes engine. The application is containerized via a dockefile.
### Docker containers

Run ```docker-compose build -t '{prefered tag}'``` and then run the container by ``` docker compose up```.

### uwsig + nginx + flask

The docker compose file is biilding two containers. One nginx web server and the web application tightly packaged on a uwsgi application server. The uwsgi application is serving the app on port 3031. The nginx is forwarding port 3031 and exposing port 80 externally.

### Kuberentes enigne

- Kuberentes deployment files are located in the root folder of the project als. See flask.yml which is specifying a deployment on a kuberentes cluster with 3 replicas. .

- Kubernetes service creation script is also located under root. It is under the name footy-phi-service.yaml and creating a loadbalancer connected to a reserved static ip address: 35.246.111.237. It is listening on 80 and exposing to 80


### Build.sh

A build script is located under root folder also for easily re-deployment. 
 - building docker images
 - pushing docker images to google registry
 - set the image for relevant deployment through kubectl CLI

Change tag name for personal google registry so push will work. 



### Files flask app
The main flask app is rather slim with following files.

/flask/app/API - RESFUL API files
/flask/app/API/defenders
/flask/app/API/midfielder
/flask/app/API/forwards
/flask/app/API/routes

/flask/app/statis - template css,js, webfonts etc.
/flask/templates - UI for endpoint and documentation
/flask/startBluePrint - template config with blueprint
/flask/__inti__.py - initlization of flask



# Datanalysis package

 
The real work of the project went on under the /flask/datanalysis package where wyscouts data where processed and analyzed with juypyter notebook and python files.

The interactive data analysis notebooks are 


### Intial exploration + processing player data
 - /flask/datanalysis/preprocessing_wyscout.ipyn


###  Position based processing, wranling and analyzing of event data
 - /flask/datanalysis/Wyscout_events.ipyn
 
 ### Final ranking elicitation analysis and merge with players
 - /flask/datanalysis/Ranking_ML.ipyn 

from datanalaysis folder run  ```jupyter notbook ./``` and navigate to the above scripts. These are the foundation for the whole project.

The findings from the jupyter notebook was carried ove to the scripts under dataanalysis/scripts where all the data is processed through several steps.


### Web crawling
Webcrwalings scripts for gathering information from transfermarkt can be found under /dataanalysis/webcrawling. These can be used in future work to match the processed data with market values and fed into a machine learning algorithm to predict market value.





 
 
 




