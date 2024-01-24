import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
	return (
		<>
			<div className="bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">
				<div className="p-5 ">
					<ul>
						<p className="text-gray-800 font-bold text-3xl pb-6">
							Klinik<span className="text-blue-600">LOGO</span>
						</p>
						<div className="flex gap-6 pb-5">
							<FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
							<FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />						
							<FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
						</div>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-2xl pb-4">Hasta Rehberi</p>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                        İnternet Çerez Politikası
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                        Ziyaretçi Politikası
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                        Refakatçi Politikası
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                        Güvenlik Bilgisi ve Politikası
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-2xl pb-4">Kurumsal</p>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                        Haberler
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                        Hakkımızda
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                        Vizyon
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                        Kalite Yönetim Sistemi
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                        Yatırımcı İlişkileri
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-2xl pb-4">Online İşlemler</p>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                        Hızlı Randevu Al
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                        Sizi Dinliyoruz
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                        Online Doktor Görüşmesi
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                        Evde Sağlık
						</li>
						
					</ul>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center text-center  p-5 bg-gray-50">
				<h1 className=" text-gray-800 font-semibold">
                Copyright © 2021-2022 .... Hastaneler Kurulu
					
				</h1>
			</div>
		</>
	);
}

export default Footer;