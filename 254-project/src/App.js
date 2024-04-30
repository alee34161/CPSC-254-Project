import './App.css';
import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const weatherKey = '01d6a2b501df4c29a61224906242304';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Fullerton');

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
        console.log("Location: " + response.data.location.name + ", " + response.data.location.region + ", " + response.data.location.country)
        console.log("Temp: " + response.data.current.temp_f + "°F");
        console.log("Local time: " + moment(response.data.location.localtime).format('MMMM Do YYYY, h:mm a'));
        setWeatherData(response.data);
        setCity(cityName); // Update city state with the entered city name
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setWeatherData(null);
      });
  };

  const renderWeatherInfo = () => {
    if (!weatherData) return null;

    return (
      <div>
        <h2>Weather Information</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Temperature (°F)</TableCell>
                <TableCell>Local Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{weatherData.location.name}</TableCell>
                <TableCell>{weatherData.location.region}</TableCell>
                <TableCell>{weatherData.location.country}</TableCell>
                <TableCell>{weatherData.current.temp_f}</TableCell>
                <TableCell>{moment(weatherData.location.localtime).format('MMMM Do YYYY, h:mm a')}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <h1>CPSC 254 Project</h1>

          <form onSubmit={handleSubmit}>
            <input placeholder='Fullerton' name='City' defaultValue='Fullerton' />
            <button type='Submit'>Get Weather</button>
          </form>

          {renderWeatherInfo()}

        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
