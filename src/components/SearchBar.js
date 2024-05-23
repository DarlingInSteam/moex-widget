import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
            sx={{margin: 1 }}
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