"use client"
import React from 'react';
import Image from "next/image";

const Vizyon = () => {
  return (

<section className="text-black" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image className='border-4 border-gradient-to-l rounded-2xl' src="/vizyon1.jpg" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
            <div className=' from-blue-300 via-white to-green-300 bg-gradient-to-tr rounded-2xl p-4 text-center shadow-md'>
                <h2 className="text-4xl font-bold cursor-default text-neutral-700 mb-4">VİZYONUMUZ</h2>
            </div>
            <div className='cursor-default bg-white m-6 rounded-md p-4 text-neutral-700 shadow-md'>
                <p className="text-base lg:text-lg ">
                Vizyonumuz, kucaklayıcı bir sağlık topluluğu oluşturarak bireylerin sağlıklı yaşamını 
                desteklemek ve toplumumuzu daha güçlü kılmaktır. Ufak klinik olarak, teknolojiyi etkin 
                bir şekilde kullanarak ve sürekli eğitimle kendimizi geliştirerek, yenilikçi sağlık 
                çözümleri sunmak hedefimizdir. Sağlık alanındaki en son gelişmeleri takip ederek, 
                hastalarımıza öncü ve güvenilir bir sağlık deneyimi yaşatmak istiyoruz. Toplumumuzun genel 
                refahını artırmak ve sağlık bilincini güçlendirmek adına sürdürülebilir bir sağlık vizyonu 
                oluşturarak, gelecek nesiller için sağlıklı bir yaşam ortamı yaratmayı taahhüt ediyoruz.
                </p>
          </div>
        </div>
    </div>
</section>)}

export default Vizyon;