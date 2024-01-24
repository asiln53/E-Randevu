import React from 'react'
import './globals.css'
import Navbar from '@/components/Navbar'
import Slider from '@/components/Slider'
import Footer from '@/components/Footer'
import Vizyon from '@/components/Vizyon'
import Misyon from '@/components/Misyon'


const layout = ({children}) => {
  return (
    <html lang='tr'>
        <body>
          
          <Navbar/>
          <div className="container mt-15 mx-auto px-12 py-1 "></div>     
          <Slider/>
          <Misyon/>
          <Vizyon/>               
          <Footer/>
         
            {children}
        </body>
    </html>
  )
}

export default layout;