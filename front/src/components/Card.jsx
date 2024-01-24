import React from 'react';
import Image from 'next/image';
import { FaInstagram, FaFacebookSquare, FaLinkedin } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import Link from 'next/link';
import doktor1 from '../pages/doktor1'
import doktor2 from '../pages/doktor2'
import doktor3 from '../pages/doktor3'

const cards = [
  { name: 'Kart 1', uzmanlik: 'Uzman Doktor', content: 'açıklama', image: '/doktor1.jpg' },
  { name: 'Kart 2', uzmanlik: 'Uzman Doktor', content: 'açıklama', image: '/doktor2.jpg' },
  { name: 'Kart 3', uzmanlik: 'Uzman Doktor', content: 'açıklama', image: '/doktor3.jpg' },
];

const Card = () => {
  return (
    <div className="container mx-auto  flex flex-wrap ">
      {cards.map((card, index) => (
        <div key={index} className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4 m-8 items-center border-4 border-gradient-to-l from-blue-300 via-white to-blue-300 bg-gradient-to-tr rounded-2xl shadow-md ">
           <div className='flex justify-center items-center py-2'>
              <Image src={card.image} width="200" height="200" className='rounded-lg '/>
            </div>
          
            <h1 className="cursor-default text-neutral-700 font-bold text-3xl text-center">{card.name}</h1>
            <p className='cursor-default font-normal uppercase text-base text-neutral-700 text-center pb-2'>{card.uzmanlik}</p>
            <p className='cursor-default font-semibold text-md text-center py-2'>{card.content}</p>
            <div className='flex justify-center items-center gap-4 py-6'>

                <FaFacebookSquare className='w-6 h-6 text-blue-600 cursor-pointer'/>
                <BsTwitter className='w-6 h-6 text-blue-400 cursor-pointer'/>
                <FaInstagram className='w-6 h-6 text-yellow-400 cursor-pointer'/>
                
            </div>

            <div className='flex justify-center items-center gap-6 py-6'>
               <Link key={index} href={'/doktor1'} className='text-white text-center  bg-gradient-to-r hover:bg-gradient-to-l from-cyan-500 to-blue-500 p-3 font-semibold rounded-lg w-11/12 '>Bilgi Al</Link>
            </div>
          
        </div>))}
    </div>
  )
}

export default Card;
