## Contributors
[Malek Bouaziz](https://github.com/malekbou)<br>
[Quang Cuong Dong](https://github.com/qd006)<br>
[Aziz Muslim Zai](https://github.com/aziz-zai)<br>
[Harbin Tairi](https://github.com/harbin-tairi)<br>
[Murad Zadran](https://github.com/Zadranm)<br>
[Elif Demir](https://github.com/ed032)<br>

# Frontend - React ⚛️
All code is located under /frontend. <br>
As advised per the project requirements we used React & Material-UI.<br>
To run it install the packages inside the package.json, via your package manager of choice and run it.<br>
NodeJS comes with the Node Package Manager, which will install all missing dependencies from the package.json file<br>

```
cd /frontend 
npm install 
npm start
```
# Backend - Python / Flask
We advise you to set up a [python virtual enviroment](https://docs.python.org/3.7/tutorial/venv.html), to keep python clean. <br>
This codes is tested under python version 3.9 <br>
All code is located under /src. <br>
To run the application on your own device, clone the repo. <br>
Activate your virtual enviroment, via the activate script.
Install the requirements inside requirements.txt & run the application by launching main.py <br>

```
cd /src
pip install -r requirements.txt     
python main.py    
```
# Database - MySQL
- MySQL Community Server 8.0.28:
    - Download the latest Community server for your OS from here https://dev.mysql.com/downloads/mysql/
    - Setup the database and import our database dump
- Google Cloud SQL:
    This requires the Google Cloud SDK & Google Cloud Proxy.
    See Google Documentation for install methods.
    Connection String for Proxy to get secure access to the Google Environment:
    ```
    ./cloud_sql_proxy - #hier schreiben
    ```
    This method will only work, if we assign you to the project team and grant you access.
- Docker:
    - This method requires Docker and Docker-compose
    - Run the docker-compose up inside the /db directory. 
    - Connect to the phpmyadmin dashboard under your localhost and import the database dump
    - Change the connection parameter inside the src/mapper.py to fit your envoirnment

Depending on the configuration you chose, you need to update the connection string inside the mapper.py / ShoppingAPI.js  


# Deployment - Google Cloud Plattform
Our live version is hosted using the Google App Engine.
For the deployment the routes need to be changed from localhost to the deployment url. #Hier unsere URL

# Deployment on Google Cloud - Backend
Google App Engine Standard Envoirnment is on Python Version 3.9 <br>
Google Cloud SQL is on MySQL, access is provided via sqlconnector. <br>
See .yaml for extra config. <br>/
Navigate to /src and run the command below<br>
Commands of use:
```
gcloud app deploy
```

# Deployment on Google Cloud - Frontend
Google App Engine Standard Envoirnment is on NodeJS 16.15.1 <br>
See .yaml file for extra config.
React requires an extra build step to generate static files for deployment, which are located in a seperate folder. <br>
This needs to be done after every change to the js files.

To update deployed version of the fronentd code see commands below.<br>
Navigate to /frontend and run the commands below:
Commands of use:
```
npm run build
gcloud app deploy
```
# Routing on Google Cloud
We decided to use a micro service architecture with seperate services for all applications.<br>
This allows us to deploy changes to the services individually and we make use of the cloud native scaling capabilities Google provides us with.<br>
Using the dispatch.yaml we redirected routing to the services on a subdomain level.<br>
This results in the following 3 URLs:<br>

#hier unsere URLs