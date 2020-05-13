# Scoutease

- Douglas Landvik
- City University of London
- Part of third year undergrad project.

## Description


An admin application for an arbritary professional football scouting department. 

The application is built in reactjs with shard dashboard lite - a UI template for react admin pages. shard dashboard lite is free and MIT licensed.

https://designrevision.com/downloads/shards-dashboard-lite/

Antd reusable components are also used for the UI. The components used are also MIT licensed.

https://ant.design/


## Prerequiste

node
 
## Installation
- Clone the repo in your terminal by clicking the _green_ clone or download button at the top right and copyin the url
- In your terminal, type ```git clone URL```
  - replace URL with the url you copied
  - hit enter
- This will copy all the files from this repo down to your computer
- In your terminal, cd into the directory you just created
- Type ```npm install``` to install all dependencies
- Last, but not least, type ```npm start``` to run the app locally.

- To look at the code, just open up the project in your favorite code editor!


# Miscellaneous

### Testing
React tests are implementented extensivley with 117 tests in 11 different test suites.
```console
npm test
```

### Firebase database
The application is configured to connect to a firebase for authorization and persistent. Please be careful with the information. The files for firebase configuration can be found under src/views/auth/

### Redux with redux toolkit
A simple flux state managemnt is used for routing as it was included in the theme. Configuration can be found under src/flux
Redux is used as state management in the application and.

### Thunk middleware
thunk middleware is used to implement asynchronous calls. 

### Configuration
The reducers are decentralized for better state management.                             
The actions, action creators are kept under slices such as 'player', 'pivotlist' etc,

 ### Root reducer
 The root reducer under /src is merging all reducers which is then intilized in the /src/store with the thunk middleware

### Redux firestore and react-redux-firebase
Methods added to thunk middleware 
- getFirebase
- getFirestore

### Redux looger
Redux logger is used to log all state actions in the console. It is helpful for debuggin.
Add redux logger extension from chrome store and find the redux logger in the chrom dev tool. 

These methods are reachable from the store and makes management of users and authorization easier.


### Dependencies
```js
     "@testing-library/react": "^9.5.0",
    "@testing-library/react-hooks": "^3.2.1",
    "@types/jest": "^25.2.1",
    "axios-mock-adapter": "^1.18.1",
    "cypress": "^3.8.3",
    "enzyme": "^3.11.0",
    "enzyme-adapter-react-16": "^1.15.2",
    "enzyme-to-json": "^3.4.4",
    "riteway": "^6.1.2",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/user-event": "^7.1.2",
    "@reduxjs/toolkit": "^1.3.6",
    "antd": "^4.2.2",
    "axios": "^0.19.2",
    "camelize": "^1.0.0",
    "chart.js": "^2.9.3",
    "classnames": "^2.2.6",
    "cross-env": "^5.2.0",
    "dateformat": "^3.0.3",
    "firebase": "^7.14.3",
    "firebase-tools": "^7.16.2",
    "flux": "^3.1.3",
    "global": "^4.4.0",
    "lodash.find": "^4.6.0",
    "react": "^16.13.1",
    "react-chartjs-2": "^2.9.0",
    "react-dom": "^16.13.1",
    "react-ga": "^2.5.6",
    "react-icons": "^3.10.0",
    "react-quill": "^1.3.5",
    "react-redux": "^7.2.0",
    "react-redux-firebase": "^3.4.0",
    "react-router-dom": "^5.2.0",
    "react-router-redux": "^4.0.8",
    "react-scripts": "^3.4.0",
    "redux": "^4.0.5",
    "redux-auth-wrapper": "^3.0.0",
    "redux-firestore": "^0.12.0",
    "redux-logger": "^3.0.6",
    "redux-mock-store": "^1.5.4",
    "semantic-ui-react": "^0.88.2",
    "serve": "^11.3.0",
    "shards-react": "^1.0.0",
    "shortid": "^2.2.14"
```


### Production


# Production


The application is deployed on google clouds kuberentes engine. The application is containerized via a dockerfile.

### Docker containers
From the root folder (frontend) there is a Dockerfile which specifies a build from a node:13.13.0-alpine base image.
Port 3000 is used. 


Run ```docker  build -t '{prefered tag}'``` and then run the container by ``` docker run -p 3000:3000 {prefered tag}


### Kuberentes enigne

- Kuberentes deployment files are located in the root folder of the project als. See react.yml which is specifying a deployment on a kuberentes cluster with 3 replicas. .

- Kubernetes service creation script is also located under root. It is under the name scoutease-servuce.yaml and creating a loadbalancer connected to a reserved static ip address: 34.105.191.26. It is listening on port 3000 (container port) and exposing to port 80.


### Build.sh

A build script is located under root folder also for easily re-deployment. 
 - building docker images
 - pushing docker images to google registry
 - set the image for relevant deployment through kubectl CLI

Change tag name for personal google registry so push will work. 



