const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors(corsOptions));
const bodyParser = require('body-parser');
const mysql = require('mysql');

const port = 3001;

const connection = mysql.createConnection({
  host: 'localhost',
  user: '254_user',
  password: '254_password',
  database: 'weather_db'
});

connection.connect();

app.use(bodyParser.json());

app.post('/weather', (req, res) => {
  const { location, temperature, localTime } = req.body;
  const query = `INSERT INTO weather_data (location, temperature, local_time) VALUES (?, ?, ?)`;
  connection.query(query, [location, temperature, localTime], (error, results) => {
    if (error) {
      console.error('Error saving data:', error);
      res.status(500).send('Error saving data');
    } else {
      res.status(200).send('Weather data saved successfully');
    }
  });
});

app.get('/weather', (req, res) => {
  connection.query('SELECT * FROM weather_data', (error, results) => {
    if (error) {
      console.error('Error retrieving data:', error);
      res.status(500).send('Error retrieving data');
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

