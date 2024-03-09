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
    { text: 'Live Tracking', icon: <MapIcon className="text-green-500" />, link: '/livetracker' },
    { text: 'EV Management', icon: <ElectricCarIcon className="text-yellow-500" />, link: '/bikes' },
    { text: 'Rides History', icon: <HistoryIcon className="text-red-500" />, link: '/history' },
    { text: 'Users', icon: <GroupIcon className="text-purple-500" />, link: '/users' },
  ];

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} className="text-white">
        <MenuIcon className='text-white' />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div className="w-64 bg-gray-800 h-screen">
          {/* Close icon to collapse the sidebar */}
          <div className="text-white flex justify-between text-xl font-bold p-4  mt-2">Menu
            <div className="p-0 sticky">
              <IconButton onClick={toggleDrawer(false)} className="text-white">
                <CloseIcon className='text-white absolute hover:bg-red-700 rounded-xl  '/>
              </IconButton>
            </div>
          </div>
          <List>
            {sidebarItems.map((item, index) => (
              <NavLink key={index} to={item.link} className="text-white ">
                <ListItem className="hover:bg-blue-500 p-4 mb-4"> {/* Added margin-bottom */}
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </NavLink>
            ))}
          </List>
          {/* Signout NavLink */}
          <NavLink to="/login" className="text-white fixed w-64 hover:bg-blue-500 bottom-4">
            <ListItem button className="hover: hover:bg-blue-500 ">
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
