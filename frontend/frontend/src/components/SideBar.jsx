import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import HistoryIcon from '@mui/icons-material/History';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from '@mui/icons-material/Group';
import { NavLink } from 'react-router-dom';
import ProfileCard from './ProfileCard';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  const handleSignOut = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Redirect the user to the login page or perform any other necessary action
    // For example, you can use React Router to redirect the user
    // history.push('/login');
  };

  const sidebarItems = [
    { text: 'Overview', icon: <HomeIcon className="text-blue-500" />, link: '/home' },
    { text: 'Live Tracking', icon: <MapIcon className="text-green-500" />, link: '/maps' },
    { text: 'EV Management', icon: <ElectricCarIcon className="text-yellow-500" />, link: '/bikes' },
    { text: 'Rides History', icon: <HistoryIcon className="text-red-500" />, link: '/history' },
    { text: 'Users', icon: <GroupIcon className="text-purple-500" />, link: '/users' },
  ];

  return (
    <div className="flex items-center bg-emerald-900 p-2 mb-2 rounded-sm ">
       <div className='text-black bg-white rounded-full'>
        
        <IconButton onClick={toggleDrawer(true)} className="text-black">
          <MenuIcon className='0' /> <div className='text-lg'> </div>
        </IconButton>
      </div>
      <div className="flex-grow text-white-400 text-2xl font-bold text-center mx-4">
   
        Dashboard
       
      </div>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div className="w-64 bg-emerald-300 h-screen p-2">
          <div className="text-black flex justify-between text-xl font-bold p-2 mt-2">Menu
            <div className="p-0 sticky">
              <IconButton onClick={toggleDrawer(false)} className="text-white">
                <CloseIcon className='text-black absolute hover:bg-red-600 rounded-xl' />
              </IconButton>
            </div>
          </div>
          <List>
            {sidebarItems.map((item, index) => (
              <NavLink key={index} to={item.link} className="text-black">
                <ListItem className="hover:bg-teal-400 p-4 mb-4 hover:text-black rounded-lg">
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </NavLink>
            ))}
          </List>
          {/* Signout NavLink */}
          <NavLink to="/" onClick={handleSignOut} className="text-black w-64">
            <ListItem  className="hover:bg-red-500 rounded-lg">
              <ListItemIcon><LogoutIcon className='text-red-600' /></ListItemIcon>
              <ListItemText primary="Sign out" />
            </ListItem>
          </NavLink>
        </div>
      </Drawer>
      <ProfileCard />
    </div>
  );
};

export default Sidebar;
