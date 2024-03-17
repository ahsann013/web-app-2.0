import React from 'react'
import Vehicles from '../components/Vehicles'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
const Vehicle = () => {
  return (
    <>
    <NavBar/>
    <div className='h-screen w-screen bg-amber-500 '>
    <Vehicles/>
    </div>
    <Footer/>
    </>
  )
}

export default Vehicle