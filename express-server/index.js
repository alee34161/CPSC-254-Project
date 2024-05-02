const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const mysql = require('mysql');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

{/*}
var db  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'admin',
  password        : 'pass',
  database        : 'weather_app'
});
*/}

// Run when app posts to localhost:8080/show
app.post('/show', (req, res) => {

  // Replace with the actual SQL query
  {/*db.query('SELECT * FROM weather', (err, rows) => {
    if(err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
*/}

  res.send("table of calls goes here, from server :)");

});

app.post('/add', (req, res) => {

  const location = req.body.location;
  console.log("location: " + req.body.location);
  const temp = req.body.temp;
  const date = req.body.date;

  console.log("to be added to db:\n" + location + "\n" + temp + "\n" + date);

  // Replace with the actual SQL query
  {/*db.query('INSERT INTO weather (location, temp, time) VALUES (?, ?, ?)', [location, temp, time], (err, rows) => {
    if(err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
*/}
});


app.listen(8080, () => {
  console.log(`Server is running on http://localhost:8080`);
});

