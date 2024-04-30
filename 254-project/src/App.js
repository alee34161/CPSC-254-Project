import './App.css';
import axios from 'axios';

const testList = [
  { title: 'item1', id: 1},
  {title: 'item2', id: 2},
  {title: 'item3', id: 3},
]

const apiCall = () => {
  axios.get('https://localhost:8080').then((data) => {
    console.log(data)
  })
}

const listItems = testList.map(item =>
  <li key={item.id}>
    {item.title}
  </li>
)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CPSC 254 Project</h1>

        <button onClick={apiCall}>Click here to make API Call</button>
        <p>
          <ul>{listItems}</ul>
        </p>
      </header>
    </div>
  );
}

export default App;
