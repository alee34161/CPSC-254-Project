import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const weatherKey = '01d6a2b501df4c29a61224906242304';

function App() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/show')
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const cityName = formData.get('City');
    if (!cityName.trim()) {
      console.log('Please enter a city');
      return;
    }

    let url = `http://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${cityName}&aqi=no`;

    axios
      .get(url)
      .then((response) => {

        const location = response.data.location.name + ", " + response.data.location.region + ", " + response.data.location.country;
        const temp = response.data.current.temp_f + "°F";
        const date = moment(response.data.location.localtime).format('MMMM Do YYYY, h:mm a');

        axios.post('http://localhost:8080/add', {location: location, temp: temp, date: date});
        axios.post('http://localhost:8080/show')
        .then((response) => {
          setWeatherData(response.data);
        })
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CPSC 254 Project</h1>

        <form onSubmit={handleSubmit}>
          <input placeholder='Fullerton' name='City' defaultValue='Fullerton' />
          <button type='Submit'>Get Weather</button>
        </form>

      </header>
      <div className="datagrid-container">
        <ThemeProvider theme={darkTheme}>
          <div style={{ height: 300, width: '100%' }}>
            <DataGrid
              rows={weatherData.map((row, index) => ({ id: index, ...row }))}
              columns={[
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'Location', headerName: 'Location', width: 200 },
                { field: 'Temperature', headerName: 'Temperature', width: 150 },
                { field: 'Date', headerName: 'Date', width: 200 },
              ]}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              className="datagrid"
            />
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
