import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const UserEdit = ({ open, onClose, cnic, onUserUpdated }) => {
  const [user, setUser] = useState({ firstname: '', lastname: '', email: '', phonenumber: '', password: '' });

  useEffect(() => {
    if (cnic) {
      axios.get(`http://localhost:3000/api/customers/${cnic}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
    }
  }, [cnic]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/customers/${cnic}`, user);
      onUserUpdated(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="firstname"
          label="First Name"
          type="text"
          fullWidth
          value={user.firstname}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="lastname"
          label="Last Name"
          type="text"
          fullWidth
          value={user.lastname}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={user.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="phonenumber"
          label="Phone Number"
          type="text"
          fullWidth
          value={user.phonenumber}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          value={user.password}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserEdit;
