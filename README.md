# ASE-kanak
Project for advanced software engineering


## Starting the backend.
In order to start the backend code, Please follow the commands below.

### Activating the virtual environment
* Install virtualenv on your system. (Using pip)
* Create a virtual environment using "virtualenv venv"
* Activate the virtual env using the command "source venv/bin/activate" (Linux) or "./venv/scripts/activate" (windows)
* Install all the needed requirements using "pip install -r requirements.txt"

### Start the backend code
* From the root directory run the command "flask run"

## Start the frontend.
In order to start the frontend code, Please follow the commands below.

### Install the required libraries
* Navigate to the frontend of the directory
* Run "npm install"

### Starting the frontend
* From the frontend of the directory run "npm start"
* Verify the same by going to "http://localhost:3000"

### Docker containerization
* Install docker and docker-compose in your system.
* From the backend directory run "docker build -t flask-app ."
* From the frontend directory run "docker build -t react app ."
* And once that is done from the root directory run "docker-compose up"
