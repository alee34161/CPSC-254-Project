import React, { useState, useEffect } from 'react';

// Library Imports
import axios from 'axios';
import moment from 'moment';

// Material UI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import {
  Stack,
  Button,
  TextField,
  Typography,
  Box,
  Card,
  CardContent
} from '@mui/material'

import './App.css';

// Theme for table
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const weatherKey = '01d6a2b501df4c29a61224906242304';

function App() {

  // State variable for table data
  const [weatherData, setWeatherData] = useState([]);

  // State variables for current request
  const [weatherTemp, setWeatherTemp] = useState([]);
  const [weatherLocation, setWeatherLocation] = useState([]);
  const [weatherDate, setWeatherDate] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/show')
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Render delete button in table cells
  const renderDeleteButton = (params) => {
    return (
        <strong>
            <Button
                variant="contained"
                size="small"
                style={{backgroundColor: "#FF5733" }}
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

  // Current Requested Weather Display
  const weatherCard = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14}} gutterBottom>
          {weatherLocation}
        </Typography>
        <Typography variant="h4" component="div">
          {weatherTemp}
        </Typography>
        <Typography sx={{ fontSize: 10}}>
          {weatherDate}
        </Typography>
      </CardContent>
    </React.Fragment>
  )

  // Clear table entries
  const onClearClick = () => {
    axios.post('http://localhost:8080/clear')
    .then((response) => {
      axios.post('http://localhost:8080/show')
      .then((response) => {
        setWeatherData(response.data);
      })
    })
  }

  // Submit button handler
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

        {/*App Title*/}
        <h1>SimpleWeather</h1>

        {/*Currently Requested Weather*/}
        <Box sx={{minWidth: 275, marginBottom: 0}}>
          {weatherData.length > 0 && (
          <Card sx={{
            backgroundColor: '#3b3b3b',
            color: 'white'}}>
            {weatherCard}
            </Card>
          )}
        </Box>

        {/*City name text entry*/}
        <div style={{paddingTop: 20}}>
        <form onSubmit={handleSubmit}>
          <TextField
            label='City'
            placeholder='Fullerton'
            variant='outlined'
            defaultValue='Fullerton'
            name='City'
            size='small'
            color='primary'
            InputProps={{
              style: {color: 'white'},
            }}
            InputLabelProps={{
              style: {color: 'white' },
            }}
          />
          <Button type='submit' variant='contained' sx={{mt: 0.2, ml: 1}}>Get Weather</Button>
        </form>
        </div>

        {/*Clear Entries Button*/}
        <div style={{
          display: "grid", 
          gridTemplateColumns: "1fr 1fr",
          placeItems: "center"}}>
        <h3>History</h3>
        <strong>
            <Button
                variant="contained"
                size="small"
                style={{backgroundColor: "#FF5733" }}
                onClick={() => {
                  onClearClick()
                  setWeatherTemp("")
                  setWeatherLocation("")
                  setWeatherDate("")
                }}
            >
                Clear Entries
            </Button>
        </strong>
        </div>
        {/*Weather Request History Table*/}
        <ThemeProvider theme={darkTheme}>
          <div style={{ height: 300, width: '70%'}}>
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
        <div style={{ height: 100 }}> </div>
      </header>
    </div>
  );
}

export default App;
