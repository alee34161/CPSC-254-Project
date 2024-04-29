import './App.css';

const testList = [
  { title: 'item1', id: 1},
  {title: 'item2', id: 2},
  {title: 'item3', id: 3},
]

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

        <button>Click here to get started!</button>
        <p>
          <ul>{listItems}</ul>
        </p>
      </header>
    </div>
  );
}

export default App;
