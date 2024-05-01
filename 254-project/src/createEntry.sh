#!/bin/bash

city=$(<temp/city.txt)
dateinfo=$(<temp/dateinfo.txt)
temperature=$(<temp/temperature.txt)

mysql -u root -e "USE weather;
				  INSERT INTO ${city} (dateinfo, temperature) VALUES
				  ('${dateinfo}', '${temperature}');"
