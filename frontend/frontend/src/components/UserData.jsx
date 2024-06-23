import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography,
  Tooltip, Box
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import DashboardContainer from './DashboardContainer';
import UserEdit from './UserEdit';
import SearchBar from './Searchbar';
import AddUserForm from './AddUser';

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCnic, setSelectedCnic] = useState(null);
  const [error, setError] = useState('');
  const [openAddUser, setOpenAddUser] = useState(false);
const apiUrl = process.env.API_URL;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/customers`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSearch = (query) => {
    if (query) {
      const filteredUsers = users.filter(user =>
        user.firstname.toLowerCase().includes(query.toLowerCase()) ||
        user.lastname.toLowerCase().includes(query.toLowerCase()) ||
        user.cnic.toLowerCase().includes(query.toLowerCase()) ||
        user.phonenumber.includes(query) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredUsers);
    } else {
      setSearchResults(users);
    }
  };

  const handleClickOpenDelete = (cnic) => {
    setSelectedCnic(cnic);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedCnic(null);
    setError('');
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/customers/${selectedCnic}`);
      setUsers(users.filter(user => user.cnic !== selectedCnic));
      handleCloseDelete();
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(error.response ? error.response.data.error : error.message);
    }
  };

  const handleClickOpenEdit = (cnic) => {
    setSelectedCnic(cnic);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedCnic(null);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers(users.map(user => (user.cnic === updatedUser.cnic ? updatedUser : user)));
  };

  const handleOpenAddUser = () => {
    setOpenAddUser(true);
  };

  const handleCloseAddUser = () => {
    setOpenAddUser(false);
  };

  const handleUserAdded = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <DashboardContainer>
      <h1 className='flex text-4xl pb-3 justify-center font-bold'>Registered User Profiles</h1>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2} bgcolor="white" borderRadius={2} mb={2}>
        <SearchBar onSearch={handleSearch} />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpenAddUser}
        >
          Add User
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">CNIC</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Balance</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(searchResults.length > 0 ? searchResults : users).map(user => (
              <TableRow key={user.cnic}>
                <TableCell align="center">{user.firstname} {user.lastname}</TableCell>
                <TableCell align="center">{user.cnic}</TableCell>
                <TableCell align="center">{user.phonenumber}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.balance}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleClickOpenEdit(user.cnic)} aria-label="edit">
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleClickOpenDelete(user.cnic)} aria-label="delete">
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this user?</DialogContentText>
          {error && <Typography variant="body2" color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="secondary">Cancel</Button>
          <Button onClick={handleDelete} color="primary">Delete</Button>
        </DialogActions>
      </Dialog>
      <UserEdit open={openEdit} onClose={handleCloseEdit} cnic={selectedCnic} onUserUpdated={handleUserUpdated} />
      <AddUserForm open={openAddUser} onClose={handleCloseAddUser} onUserAdded={handleUserAdded} />
    </DashboardContainer>
  );
};

export default UserData;
