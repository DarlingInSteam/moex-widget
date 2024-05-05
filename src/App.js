import logo from './logo.svg';
import './App.css';
import "@mui/material/Button";
import {Button} from "@mui/material";
import SearchBar from "./components/SearchBar";
import Stock from "./components/Stock";
import {useState} from "react";

function App() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    return (
        <div className="App">
            <header className="App-header">
                <SearchBar onChange={handleChange}/>
            </header>
            <div>
                <Stock searchTerm={searchTerm}/>
            </div>
        </div>
    );
}

export default App;
