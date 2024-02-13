import logo from './logo.svg';
import './App.css';
import "@mui/material/Button";
import {Button} from "@mui/material";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <SearchBar></SearchBar>
      </header>
    </div>
  );
}

export default App;
