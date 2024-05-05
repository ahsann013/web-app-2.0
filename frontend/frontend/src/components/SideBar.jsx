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

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  const sidebarItems = [
    { text: 'Overview', icon: <HomeIcon className="text-blue-500" />, link: '/home' },
    { text: 'Live Tracking', icon: <MapIcon className="text-green-500" />, link: '/maps' },
    { text: 'EV Management', icon: <ElectricCarIcon className="text-yellow-500" />, link: '/bikes' },
    { text: 'Rides History', icon: <HistoryIcon className="text-red-500" />, link: '/history' },
    { text: 'Users', icon: <GroupIcon className="text-purple-500" />, link: '/users' },
  ];

  return (
    <div className="flex items-center bg-black p-2 rounded-lg">
      <div className='text-black bg-amber-400 rounded-full'>
      <IconButton onClick={toggleDrawer(true)} className="text-white">
        <MenuIcon className='0' /> <div className='text-lg'></div>
      </IconButton>
      </div>
      <div className="flex-grow text-amber-400 text-2xl font-bold text-center mx-4">
        Dashboard
      </div>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div className="w-64 bg-black h-screen">
          <div className="text-white flex justify-between text-xl font-bold p-4 mt-2">Menu
            <div className="p-0 sticky">
              <IconButton onClick={toggleDrawer(false)} className="text-white">
                <CloseIcon className='text-white absolute hover:bg-red-700 rounded-xl' />
              </IconButton>
            </div>
          </div>
          <List>
            {sidebarItems.map((item, index) => (
              <NavLink key={index} to={item.link} className="text-white">
                <ListItem className="hover:bg-amber-400 p-4 mb-4 hover:text-black">
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </NavLink>
            ))}
          </List>
          {/* Signout NavLink */}
          <NavLink to="/login" className="text-white fixed w-64 hover:bg-red-500 bottom-4">
            <ListItem button className="hover: hover:bg-red-500 ">
              <ListItemIcon><LogoutIcon className='text-red-600' /></ListItemIcon>
              <ListItemText primary="Sign out" />
            </ListItem>
          </NavLink>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
