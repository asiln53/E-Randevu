"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Uzmanlık",
    id: "uzmanlik",
    content: (
      <ul className="list-disc pl-2">
        <li>Hematoloji</li>
        <li>Allojeneik kök hücre nakli</li>
        <li>Otolog kök hücre nakli</li>
        <li>Transplantasyon</li>
        
        
        
      </ul>
    ),
  },
  {
    title: "Eğitim",
    id: "egitim",
    content: (
      <ul className="list-disc pl-2">
        <li>Ankara Üniversitesi Tıp Fakültesi - Tıp Eğitimi</li>
        <li>Gazi Üniversitesi Tıp Fakültesi İç Hastalıkları Anabilim Dalı - İç Hastalıkları - Uzmanlık</li>
        <li>Gazi Üniversitesi Tıp Fakültesi Hematoloji Bilim Dalı - Hematoloji - Yan Dal Uzmanlık</li>
        <li>Duke University Bone Marrow Transplantation Center - Kök Hücre Nakil Eğitimi</li>
        <li>Fred Hutchinson Cancer Research Center Seattle - Kök Hücre Nakil Eğitimi</li>
      
      </ul>
    ),
  },
  {
    title: "Bilimsel Yayınlar",
    id: "yayin",
    content: (
      <ul className="list-disc pl-2">
        <li>137 Makale ve 230 Bildiri</li>
        <li>Uluslararası Dergilerde Yayımlanan Makale Sayısı: 111 ( 78'i birinci isim veya sorumlu yazar )</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("uzmanlik");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-black" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/doktor1.jpg" width={500} height={500} className="rounded-sm" />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-black mb-4">Hakkımda</h2>
          <p className="text-base lg:text-lg">
          Merhaba, ben Ayşe Levent. Uzun yıllardır hematoloji uzmanı olarak çalışıyorum ve 
          bu süreçte kan ve kan hastalıkları üzerine geniş bir deneyim kazandım. 
          Tıp eğitimimden sonra hematolojiye olan ilgim beni bu alanda uzmanlaşmaya yönlendirdi. 
          Her hastamı benzersiz bir birey olarak ele alıp kişiselleştirilmiş tedavi planları 
          oluşturmayı hedefliyorum. Güncel tedavi yöntemlerini takip ediyor, hastalarıma en iyi 
          sağlık hizmetini sunmak için çaba sarf ediyorum. Sağlıklı ve mutlu bir yaşam sürmeleri 
          için hastalarımla birlikte çalışmayı ve onlara rehberlik etmeyi önemsiyorum. İhtiyacınız 
          olduğunda bana her zaman ulaşabilirsiniz. Sağlıklı günler dilerim.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("uzmanlik")}
              active={tab === "uzmanlik"}
            >
              {" "}
              Uzmanlık{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("egitim")}
              active={tab === "egitim"}
            >
              {" "}
              Eğitim{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("yayin")}
              active={tab === "yayin"}
            >
              {" "}
              Bilimsel Yayınlar{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;