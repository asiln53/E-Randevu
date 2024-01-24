import React from 'react'
import '../app/globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const iletisim = () => {
  return (
    <div className='from-blue-300 via-white to-blue-300 bg-gradient-to-tr'>
      <Navbar/>
      <div className="container mt-20 mx-auto px-12 py-1 "></div>  

      <div className="bg-white p-8 border rounded-md shadow-md max-w-md mx-auto mt-10">
      <h1 className='font-bold mb-4 text-2xl text-sky-800'>İLETİŞİM BİLGİLERİ</h1>  
      <h3 className="text-xl font-bold mb-4 text-sky-600">Klinik Alfa</h3>
      <p className="mb-2"><span className="font-bold">Adres:</span> Aşağı Mahalle Yukarı Sokak No:55 Atakum/Samsun</p>
      <p className="mb-2"><span className="font-bold">Telefon:</span> 0555 555 55 55</p>
      <p className="mb-2"><span className="font-bold">Fax:</span> 0362 545 55 55</p>
      <p className="mb-2"><span className="font-bold">E-posta:</span> klinik@example.com</p>
      </div>

      <div className="container mt-20 mx-auto px-12 py-1 "></div>
      <Footer/>
      
    </div>
  )
}

export default iletisim;