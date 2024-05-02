import './App.css';
import axios from 'axios';
import moment from 'moment';

const weatherKey = '01d6a2b501df4c29a61224906242304';

function App() {

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

        //console.log("Location: " + response.data.location.name + ", " + response.data.location.region + ", " + response.data.location.country)
        //console.log("Temp: " + response.data.current.temp_f + "°F");
        //console.log("Local time: " + moment(response.data.location.localtime).format('MMMM Do YYYY, h:mm a'));

        axios.post('http://localhost:8080/add', {location: location, temp: temp, date: date});
        axios.post('http://localhost:8080/show')
        .then((response) => {
          console.log("show response: " + response.data);
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
    </div>
  );
}

export default App;
