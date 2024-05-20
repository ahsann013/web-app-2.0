import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';

const AddUser = ({ open, onClose, onAddUser }) => {
  const [newUserData, setNewUserData] = useState({
    firstname: '',
    lastname: '',
    cnic: '',
    phonenumber: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddUser = async () => {
    try {
      await axios.post('http://localhost:3000/api/customers', newUserData);
      onAddUser();
      onClose();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className='flex flex-1 justify-end mr'>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className=''>Add User</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          name="firstname"
          value={newUserData.firstname}
          onChange={handleInputChange}
          className="mb-4"
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          name="lastname"
          value={newUserData.lastname}
          onChange={handleInputChange}
          className="mb-4"
        />
        <TextField
          label="CNIC"
          variant="outlined"
          fullWidth
          name="cnic"
          value={newUserData.cnic}
          onChange={handleInputChange}
          className="mb-4"
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          name="phonenumber"
          value={newUserData.phonenumber}
          onChange={handleInputChange}
          className="mb-4"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={newUserData.email}
          onChange={handleInputChange}
          className="mb-4"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddUser} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
    </div>
  );
};

export default AddUser;
