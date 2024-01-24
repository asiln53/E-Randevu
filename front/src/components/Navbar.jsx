"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import hekimler from '@/pages/hekimler';

function NavBar() {
  const [navbar, setNavbar] = useState(false);

  return (
    <div>
      <nav className="w-full h-auto bg-sky-600 fixed top-0 left-0 right-0 z-10 shadow-xl">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              {/* LOGO */}
              <Link href="/">
                <h2 className="text-3xl text-white font-bold ">LOGO</h2>
              </Link>
              {/* HAMBURGER BUTTON FOR MOBILE */}
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <Image src="/close.svg" width={30} height={30} alt="logo" />
                  ) : (
                    <Image
                      src="/hamburger-menu.svg"
                      width={30}
                      height={30}
                      alt="logo"
                      className="focus:border-none active:border-none"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'p-12 md:p-0 block' : 'hidden'
              }`}
            >
              <ul className="h-screen md:h-auto items-center justify-center md:flex ">
                <li className="pb-6 text-xl text-white py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-sky-700  border-black  md:hover:text-black md:hover:bg-transparent">
                  <Link href="/" >
                    Hakkımızda
                  </Link>
                </li>
                <li className="pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-sky-700 border-black  md:hover:text-black md:hover:bg-transparent">
                  <Link href="/hastaRehber" onClick={() => setNavbar(!navbar)}>
                    Hasta Rehberi
                  </Link>
                </li>
                <li className="pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-sky-700  border-black  md:hover:text-black md:hover:bg-transparent">
                  <Link href="/hekimler" onClick={() => setNavbar(!navbar)}>
                    Hekimler
                  </Link>
                </li>
                <li className="pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-sky-700  border-black  md:hover:text-black md:hover:bg-transparent">
                  <Link href="/iletisim" onClick={() => setNavbar(!navbar)}>
                    İletişim
                  </Link>
                </li>
                <li className='flex flex-col items-center  py-3'>
                <a href='http://localhost:3005/login'className="custom-button mb-4 w-full md:w-auto md:mb-0 text-sky-600 uppercase bg-gradient-to-r hover:bg-gradient-to-l from-white to-blue-300 p-3 font-semibold rounded-lg">Giriş Yap</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;