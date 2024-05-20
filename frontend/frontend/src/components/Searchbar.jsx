import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import AddUser from './AddUser';

const SearchBar = ({ setSearchResults }) => {
  const [query, setQuery] = useState('');
  const [openAddUser, setOpenAddUser] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/customersearch?cnic=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleAddUserOpen = () => {
    setOpenAddUser(true);
  };

  const handleAddUserClose = () => {
    setOpenAddUser(false);
  };

  return (
    <div className="flex w-full mx-2 mt-8 p-4 bg-gray-200 rounded-lg">
      <div className='flex w-1/3'>
        <TextField
          label="Search by CNIC"
          variant="standard"
          fullWidth
          value={query}
          onChange={handleInputChange}
          className="mb-2 w-1/2"
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
      >
        Search
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddUserOpen}
      >
        Add User
      </Button>
      <AddUser open={openAddUser} onClose={handleAddUserClose}className='flex-1  justify-end' />
    </div>
  );
};

export default SearchBar;
