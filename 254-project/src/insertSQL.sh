#!/bin/bash

city=$(<temp/city.txt)
dateinfo=$(<temp/dateinfo.txt)
temperature=$(<temp/temperature.txt)

mysql -u root -e "CREATE DATABASE IF NOT EXISTS weather;
				  USE weather;
				  CREATE TABLE IF NOT EXISTS ${city}
				  (
				  id INT unsigned AUTO_INCREMENT,
				  dateinfo VARCHAR(150) NOT NULL,
				  temperature VARCHAR(150) NOT NULL,
				  PRIMARY KEY (id)
				  );
				  USE weather;
				  INSERT INTO ${city} (dateinfo, temperature) VALUES
				  ('${dateinfo}', '${temperature}');"
