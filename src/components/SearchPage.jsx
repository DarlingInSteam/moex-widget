import SearchBar from "./SearchBar";
import Stock from "./Stock";
import {useState} from "react";

export default function SearchPage(props) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    return (
        <div className="search-page">
            <header className="App-header">
                <SearchBar onChange={handleChange}/>
            </header>
            <div className="search-stock">
                <Stock searchTerm={searchTerm}/>
            </div>
        </div>
    )
}