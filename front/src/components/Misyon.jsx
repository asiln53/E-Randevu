"use client"
import React from 'react';
import Image from "next/image";

const Misyon = () => {
  return (
    <section className="text-black" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-6 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <div className=' from-blue-300 via-white to-green-300 bg-gradient-to-tr rounded-2xl p-4 text-center shadow-md'>
            <h2 className="text-4xl font-bold cursor-default text-neutral-700 mb-4">MİSYONUMUZ</h2>
          </div>
          <div className='cursor-default bg-white m-6 rounded-md p-4 text-neutral-700 shadow-md'>
            <p className="text-base lg:text-lg ">
            Misyonumuz, toplumumuza kaliteli ve erişilebilir sağlık hizmetleri sunarak bireylerin 
            sağlıklı bir yaşam sürmelerine katkıda bulunmaktır. Ufak klinik olarak, hasta odaklı bir yaklaşım 
            benimsemek ve her bir hastamızın bireysel ihtiyaçlarına duyarlılık göstermek temel prensibimizdir. 
            Sağlık ve refahı ön planda tutarak, deneyimli ve uzman bir ekibimizle hastalarımıza güvenilir, 
            etkili ve şefkatli bir tedavi sunmayı amaçlıyoruz. İnsan odaklı bakış açımızla, hastalarımızın 
            memnuniyetini en üst düzeye çıkarmak ve onlara sıcak bir ortamda tedavi hizmeti sunmak temel 
            hedefimizdir. Sağlıkta sürekli iyileşmeyi destekleyerek, toplumumuzun genel sağlığını güçlendirmek 
            için çaba harcamaktayız.
            </p>
          </div>
        </div>
        <Image className='border-4 border-gradient-to-l rounded-2xl' src="/misyon2.jpg" width={500} height={500} />
      </div>
    </section>
  );
}

export default Misyon;
