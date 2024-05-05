import {Container, InputAdornment, Stack, TextField} from "@mui/material";
import {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import Stock from "./Stock";

export default function SearchBar({onChange}) {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <TextField
            id="search"
            type="search"
            label="Поиск"
            onChange={handleChange}
            sx={{width: 600}}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon/>
                    </InputAdornment>
                ),
            }}
        />
    );
}