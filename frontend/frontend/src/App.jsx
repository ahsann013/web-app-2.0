// Desc: Main App file

import { Routes, Route, BrowserRouter } from 'react-router-dom'
import "@fontsource/poppins";

import './output.css'
import Contact from './Pages/Contact'
import Vehicle from './Pages/Vehicle'
import Homepage from './Pages/Homepage'

import LoginPage from './Pages/LoginPage'

import Dashboard from './components/DashboardMain'


function App() {


  return (
    <>
      <BrowserRouter>


        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/ContactUs' element={<Contact />} />
          <Route path='/Vehicle' element={<Vehicle />} />
          <Route path='/Login' element={<LoginPage />} />
          <Route path='/Dashboard' element={<Dashboard />} />
        
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
