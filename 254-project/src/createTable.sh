#!/bin/bash

city=$(<temp/city.txt)

mysql -u root -e 	"USE weather;
					 CREATE TABLE ${city}
					 (
					 id INT unsigned AUTO_INCREMENT,
					 dateinfo VARCHAR(150) NOT NULL,
					 temperature VARCHAR(150) NOT NULL,
					 PRIMARY KEY (id)
					 );"
