# 254 Project

## Description
CPSC 254 Project designed to fulfill requirements related to open source software.

## Features
* Get weather info by entering a city
* View history of previous weather requests
* Remove previous weather requests from history
* Clear entire weather request history

## Installation
To install and run the "254 Project" web app, follow these steps:

1. Clone the repository: `git clone https://github.com/alee34161/CPSC-254-Project`
2. Install dependencies: `npm install`
3. Install MySQL server: `apt-get install mysql-server`
4. Configure mysql root passsword: `sudo mysql` `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';`
5. Start the express server (in express-server): `node index.js`
6. Start the app (in 254-project): `npm start`

## Usage
Enter the name of a city and click the "Get Weather" button

## License
This project is licensed under the [MIT License](LICENSE)
