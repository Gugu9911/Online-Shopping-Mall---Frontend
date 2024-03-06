import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';


interface SearchBoxProps {
    onSearch: (query: string) => void; // Function to handle the search query
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(query); // Execute the search based on the current query
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" sx={{ mt: 1 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={8} md={9} sx={{ ".MuiOutlinedInput-root": { borderRadius: '50px' } }}>
                    <TextField
                        fullWidth
                        label="Search products by name..."
                        variant="outlined"
                        value={query}
                        onChange={handleChange}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ height: '100%' }}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SearchBox;
