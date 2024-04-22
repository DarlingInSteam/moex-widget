import {Container, InputAdornment, Stack, TextField} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Stock from "./Stock";

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Stack maxWidth="md" sx={{ mt: 1 }}>
            <TextField
                id="search"
                type="search"
                label="Поиск"
                value={searchTerm}
                onChange={handleChange}
                sx={{ width: 600 }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <Stock/>
        </Stack>
    );
}