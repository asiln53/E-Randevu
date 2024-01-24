import React from 'react'
import '../app/globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Card from '@/components/Card'

const hekimler = () => {
  return (
    <div>
      <Navbar/>
      <div className="container mt-20 mx-auto px-12 py-1 "></div>    
      <Card/>
      <Footer/>
    </div>
  )
}

export default hekimler;