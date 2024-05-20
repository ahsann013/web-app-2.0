import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';

const ProfileCard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [adminData, setAdminData] = useState(null);

  // Load admin data from local storage when the component mounts
  useEffect(() => {
    const adminDataFromStorage = localStorage.getItem('admin');
    if (adminDataFromStorage) {
      setAdminData(JSON.parse(adminDataFromStorage));
    }
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Button
        onClick={handleOpenModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        View Profile
      </Button>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Admin Profile</DialogTitle>
        <DialogContent>
          {adminData && (
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="flex items-center justify-center">
                <img
                  className="h-24 w-24 rounded-full"
                  src="https://avatar.iran.liara.run/public/15"
                  alt="Admin"
                />
              </div>
              <div className="text-center mt-4">
                <p className="text-xl font-semibold text-gray-800">{adminData.username}</p>
                <p className="text-sm font-medium text-gray-600">Administrator</p>
              </div>
              <div className="border-t border-gray-200 px-6 py-4">
                <p className="text-sm text-gray-600">Email: {adminData.email}</p>
                <p className="text-sm text-gray-600">CNIC: {adminData.cnic}</p>
                {/* You can add more information here */}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileCard;
