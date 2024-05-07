import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const weatherKey = '01d6a2b501df4c29a61224906242304';

function App() {
  const [weatherTemp, setWeatherTemp] = useState([]);
  const [weatherLocation, setWeatherLocation] = useState([]);
  const [weatherDate, setWeatherDate] = useState([]);
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

  const renderDeleteButton = (params) => {
    return (
        <strong>
            <Button
                variant="contained"
                size="small"
                style={{ marginLeft: 16, backgroundColor: "#FF5733" }}
                onClick={() => {
                  const currentRow = params.row.id;
                  axios.post('http://localhost:8080/delete', {id: currentRow})
                  .then((response) => {
                    axios.post('http://localhost:8080/show')
                    .then((response) => {
                      setWeatherData(response.data);
                    })
                  })
                }}
            >
                Remove
            </Button>
        </strong>
    )
  }

  const rendeClearButton = (params) => {
    return (
        <strong>
            <Button
                variant="contained"
                size="small"
                style={{ marginLeft: 16, backgroundColor: "#FF5733" }}
                onClick={() => {
                  const currentRow = params.row.id;
                  axios.post('http://localhost:8080/clear')
                  .then((response) => {
                    axios.post('http://localhost:8080/show')
                    .then((response) => {
                      setWeatherData(response.data);
                    })
                  })
                }}
            >
                Clear Entries
            </Button>
        </strong>
    )
  }

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

        axios.post('http://localhost:8080/add', {location: location, temp: temp, date: date})
        .then((response) => {
          console.log(response);
          axios.post('http://localhost:8080/show')
          .then((response) => {
            setWeatherData(response.data);
            setWeatherTemp(temp);
            setWeatherLocation(location);
            setWeatherDate(date);
          })
        })
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Weather App</h1>

        <div style={{padding: 10}}>
        <form onSubmit={handleSubmit}>
          <input placeholder='Fullerton' name='City' defaultValue='Fullerton' />
          <button type='Submit'>Get Weather</button>
        </form>
        </div>

        <Stack spacing={1}>
            <h3>{weatherTemp}</h3>
            <p>{weatherLocation}</p>
            <p>{weatherDate}</p>
        </Stack>

        <div style={{padding: 10}}>
          renderClearButton
        </div>
  
        <ThemeProvider theme={darkTheme}>
          <div style={{ height: 300, width: '70%', padding: 10 }}>
            <DataGrid
              rows={weatherData.map((row, index) => ({...row }))}
              columns={[
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'Location', headerName: 'Location', width: 200 },
                { field: 'Temperature', headerName: 'Temperature', width: 150 },
                { field: 'Date', headerName: 'Date', width: 200 },
                { field: 'Remove', headerName: 'Remove', width: 150, renderCell: renderDeleteButton}
              ]}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              className="datagrid"
            />
          </div>
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
