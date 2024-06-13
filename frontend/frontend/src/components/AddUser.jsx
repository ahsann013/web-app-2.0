import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

const AddUserForm = ({ open, onClose, onUserAdded }) => {
  const [newUser, setNewUser] = useState({
    CNIC: '',
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    Email: '',
    Balance: 0,
    Password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://20.244.46.184:3000/api/customers', newUser);
      onUserAdded(response.data); // Notify parent component with the added user data
      onClose();
    } catch (error) {
      console.error('Error adding user:', error);
      setError(error.response ? error.response.data.error : error.message);
    }
  };

  const handleClose = () => {
    onClose();
    setError('');
    setNewUser({
      CNIC: '',
      FirstName: '',
      LastName: '',
      PhoneNumber: '',
      Email: '',
      Balance: 0,
      Password: ''
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill out the details below to add a new user.
        </DialogContentText>
        <TextField
          margin="dense"
          name="CNIC"
          label="CNIC"
          type="text"
          fullWidth
          value={newUser.CNIC}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="FirstName"
          label="First Name"
          type="text"
          fullWidth
          value={newUser.FirstName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="LastName"
          label="Last Name"
          type="text"
          fullWidth
          value={newUser.LastName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="PhoneNumber"
          label="Phone Number"
          type="text"
          fullWidth
          value={newUser.PhoneNumber}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="Email"
          label="Email"
          type="email"
          fullWidth
          value={newUser.Email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="Balance"
          label="Balance"
          type="number"
          fullWidth
          value={newUser.Balance}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="Password"
          label="Password"
          type="password"
          fullWidth
          value={newUser.Password}
          onChange={handleChange}
        />
        {error && <p className="text-red-500">{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddUser} color="primary">Add User</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserForm;
