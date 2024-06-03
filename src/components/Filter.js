import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FilterComponent = ({ filterType, setFilterType, filterOptions }) => {
    return (
        <FormControl sx={{
            minWidth: { xs: '110px', sm: '200px' },
            '.MuiInputBase-root': {
                height: { xs: '40px', sm: 'auto' },
                fontSize: { xs: '0.8rem', sm: '1rem' },
            }
        }}>
            <InputLabel sx={{
                    fontSize: { xs: '0.65rem', sm: '1rem' },
                    wordWrap: 'break-word',
                    whiteSpace: 'normal'
                }}>Filter By Type</InputLabel>
            <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                sx={{
                    width: { xs: '110px', sm: '200px' },
                }}
            >
                {filterOptions.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FilterComponent;
