const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

{var db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: ""
});

db.connect(function(err) {
	if (err) throw err;
	//console.log("It's connecting");
	db.query("CREATE DATABASE IF NOT EXISTS weatherdb", function (err, result) {
		if (err) throw err;
		//console.log("Database created");
	db.query("USE weatherdb", function (err, result) {
		if (err) throw err;
		//console.log("using correct database for now");
	});
	db.query("CREATE TABLE IF NOT EXISTS Weather (Location VARCHAR(150), Temperature VARCHAR(150), Date VARCHAR(150))", function (err, result) {
		if (err) throw err;
		//console.log("made a table using database hopefully");
	});
	});
});


}

// Run when app posts to localhost:8080/show
app.post('/show', (req, res) => {

  // Replace with the actual SQL query
  //var results = "";
  {db.query("USE weatherdb");
  db.query("SELECT * FROM Weather", function (err, results, fields) {
  	if (err) throw err;

	console.log("Fields:");
	fields.forEach(field => {
		console.log(field.name);
	});

	console.log("Results:");
	results.forEach(result=> {
		console.log(result.name);
	});

	res.json(results)

  });
  }

  //console.log("Results: " + toString(results));

  //res.send("test from /show")

});

app.post('/add', (req, res) => {

  const location = req.body.location;
  console.log("location: " + req.body.location);
  const temp = req.body.temp;
  const date = req.body.date;

  //console.log("to be added to db:\n" + location + "\n" + temp + "\n" + date);

  // Replace with the actual SQL query
  {db.query("USE weatherdb");
  db.query("INSERT INTO Weather (Location, Temperature, Date) VALUES (\'"+location+"\', \'"+temp+"\', \'"+date+"\')");
  }
});


app.listen(8080, () => {
  console.log(`Server is running on http://localhost:8080`);
});

