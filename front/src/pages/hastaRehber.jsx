import React from 'react'
import '../app/globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import InfoSec from '@/components/InfoSection'

const rehber = () => {
  return (
    <div className='from-blue-300 via-white to-blue-300 bg-gradient-to-tr'>
      <Navbar/>
      <div className="container mt-20 mx-auto px-12 py-1 "></div>  

      <InfoSec/>
      <Footer/>
      
    </div>
  )
}

export default rehber;