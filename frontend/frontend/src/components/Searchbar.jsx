import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <TextField
        label="Search"
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        style={{ marginRight: '10px' }}
      />
      <IconButton>
        <Search />
      </IconButton>
    </div>
  );
};

export default SearchBar;
