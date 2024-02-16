import logo from './logo.svg';
import './App.css';
import "@mui/material/Button";
import {Button} from "@mui/material";
import SearchBar from "./components/SearchBar";
import Stock from "./components/Stock";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <SearchBar/>
      </header>
        <div>
            <Stock/>
        </div>
    </div>
  );
}

export default App;
