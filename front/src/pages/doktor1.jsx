import React from 'react'
import '../app/globals.css'
import Navbar from '../components/Navbar'
import HeroSec from '../components/HeroSec'
import About from '../components/About'

const doktor1 = () => {
    return (
      <div>
        <Navbar/>
        <div className="container mt-20 mx-auto px-12 py-1 "></div>  
        <HeroSec/>
        <About/>
        
      </div>
    )
  }
  
  export default doktor1;