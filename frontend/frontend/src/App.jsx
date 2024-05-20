// Desc: Main App file

import { Routes, Route, Navigate} from 'react-router-dom'
import "@fontsource/poppins";

import './output.css'


import Login from './components/Login';

import MapContainer from './components/MapContainer';
import RideHistory from './components/RideHistory';
import Bikes from './components/Bikes';
import Home from './components/Home';
import UserData from './components/UserData';
import ProtectedRoute from './components/ProtectedRoute';



function App() {


  
  return (
    <>
    
        <Routes>
          <Route exact path='/' element={<ProtectedRoute Component = {Login}/> } />
          <Route path='/history' element={<ProtectedRoute Component = {RideHistory}/>} />
          <Route path='/bikes' element={<ProtectedRoute Component = {Bikes}/>} />
          <Route path='/maps' element={<ProtectedRoute Component = {MapContainer}/>} />
          <Route path='/users' element={<ProtectedRoute Component = {UserData}/>} />
          <Route path='/home' element={<ProtectedRoute Component = {Home}/>} />

         
        </Routes>
    


    </>
  )
}

export default App
