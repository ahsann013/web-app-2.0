import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import DashboardContainer from './DashboardContainer';
import UserEdit from './UserEdit';
import SearchBar from './Searchbar';

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCnic, setSelectedCnic] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/customers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSearch = (data) => {
    setSearchResults(data);
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
      await axios.delete(`http://localhost:3000/api/customers/${selectedCnic}`);
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

  return (
    <DashboardContainer>
      <SearchBar onSearch={handleSearch} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>CNIC</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(searchResults.length > 0 ? searchResults : users).map(user => (
              <TableRow key={user.cnic}>
                <TableCell>{user.firstname} {user.lastname}</TableCell>
                <TableCell>{user.cnic}</TableCell>
                <TableCell>{user.phonenumber}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickOpenEdit(user.cnic)} aria-label="edit">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleClickOpenDelete(user.cnic)} aria-label="delete">
                    <Delete />
                  </IconButton>
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
         
          {error && <p className="text-red-500">{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDelete} color="primary">Delete</Button>
        </DialogActions>
      </Dialog>
      <UserEdit open={openEdit} onClose={handleCloseEdit} cnic={selectedCnic} onUserUpdated={handleUserUpdated} />
    </DashboardContainer>
  );
};

export default UserData;