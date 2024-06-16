import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person'; // Importing Person icon from Material-UI icons

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
    <div className='rounded-full'>
      <button
        onClick={handleOpenModal}
        className="bg-white rounded-full hover:bg-blue-700 text-white font-bold  p-2  flex-1 items-center justify-center"
      >
        <PersonIcon className="text-black" /> {/* Material-UI Person icon */}
        
      </button>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle className="text-center">Admin Profile</DialogTitle>
        <DialogContent className="flex justify-center">
          {adminData && (
            <div className="max-w-md mx-auto shadow-lg rounded-lg overflow-hidden">
              <div className="flex items-center justify-center">
                <img
                  className="h-24 w-24 rounded-full"
                  src="https://avatar.iran.liara.run/public/15"
                  alt="Admin"
                />
              </div>
              <div className="text-center mt-4">
                <p className="text-xl font-semibold text-gray-800">{adminData.firstname}</p>
                <p className="text-sm font-medium text-gray-600">Administrator</p>
              </div>
              <div className="border-t border-gray-200 px-6 py-4">
                <table className="table-auto w-full">
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 text-sm font-medium text-gray-600">Email:</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{adminData.email}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm font-medium text-gray-600">CNIC:</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{adminData.cnic}</td>
                    </tr>
                    {/* Add more rows for additional information */}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileCard;
