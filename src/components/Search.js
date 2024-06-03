import React from 'react';
import { TextField } from '@mui/material';

const SearchComponent = ({ searchTerm, setSearchTerm }) => {
    return (
        <TextField
            label="Search Releases"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
                width: { xs: '140px', sm: '375px', lg: '500px' },
                // fontSize: { xs: '0.8rem', sm: '1rem' },
                '.MuiInputBase-input': {
                    height: { xs: '7px', sm: 'auto' } // Adjust for mobile
                },
                '.MuiInputLabel-root': {
                    fontSize: { xs: '0.8rem', sm: '1rem' }
                }
            }}
        />
    );
};

export default SearchComponent;
