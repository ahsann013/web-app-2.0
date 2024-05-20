import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
import { Height } from '@mui/icons-material';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  

  useEffect(() => {
    // Function to fetch notifications from the API
    const fetchNotifications = async () => {
      try {
        // Make API call to fetch notifications
        const response = await axios.get('http://localhost:3000/api/notifications');
        // Set the notifications in the state
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        // Handle error if needed
      }
    };
    
  
    // Call the function to fetch notifications when the component mounts
    fetchNotifications();
  }, []);

  return (
    <div className="  flex-1 justify-start rounded-xl" >
      <Card className="shadow-md bg-emerald-400 justify-start my-3 p-2 rounded-xl w-screen-0">
        <CardContent className='bg-emerald-300 rounded-xl '>
          <Typography variant="h5" component="h2" className="mb-4">
            Notifications
          </Typography>
          {/* Notification list */}
          <ul className="list-none p-0">
            {/* Check if notifications is an array and not null before mapping */
            }
            {Array.isArray(notifications) && notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li key={index} className="border-b border-gray-200 py-3">
                  <Typography variant="body1">
                  Accident Detected:  Bike ID: {notification.bikeid}, Time:  {new Date(notification.timerecorded).toLocaleString()}
                  </Typography>
                </li>
              ))
            ) : (
              <li>No notifications found</li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationComponent;
