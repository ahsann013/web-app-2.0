// Desc: Main App file

import { Routes, Route} from 'react-router-dom'
import "@fontsource/poppins";

import './output.css'
import Contact from './Pages/Contact'
import Vehicle from './Pages/Vehicle'
import Homepage from './Pages/Homepage'

import LoginPage from './Pages/LoginPage'

import Dashboard from './components/DashboardMain'
import MapContainer from './components/MapContainer';
import RideHistory from './components/RideHistory';
import Bikes from './components/Bikes';
import Home from './components/Home';
import UserData from './components/UserData';


function App() {


  return (
    <>
    
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/vehicle' element={<Vehicle />} />
          <Route path='/login' element={<LoginPage />} />
   
          <Route path='/history' element={<RideHistory/>} />
          <Route path='/bikes' element={<Bikes/>} />
          <Route path='/livetracker' element={<MapContainer/>} />
          <Route path='/users' element={<UserData/>} />
          <Route path='/home' element={<Home/>} />

        </Routes>
    


    </>
  )
}

export default App
