const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

var cors = require('cors');
app.use(cors(corsOptions));

const port = 3001;



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

