"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./InfoCard";
import ProjectTag from "./InfoTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "hastalik1",
    description: "hastalik1 description",
    image: "/proje2.jpg",
    tag: ["Hepsi", "Hastalık"],  
    previewUrl: "/",
  },
  {
    id: 2,
    title: "hastalik2",
    description: "hastalik2 description",
    image: "/proje2.jpg",
    tag: ["Hepsi", "Hastalık"],    
    previewUrl: "/",
  },
  {
    id: 3,
    title: "hastalik3",
    description: "hastalik3 description",
    image: "/proje2.jpg",
    tag: ["Hepsi", "Hastalık"],   
    previewUrl: "/",
  },
  {
    id: 4,
    title: "İnternet Çerez Politikası",
    description: "İnternet Çerez Politikası hakkında bilgilendirme.",
    image: "/proje2.jpg",
    tag: ["Hepsi", "Rehber"],    
    previewUrl: "/",
  },
  {
    id: 5,
    title: "hastalik4",
    description: "hastalik",
    image: "/proje2.jpg",
    tag: ["Hepsi", "Hastalık"],    
    previewUrl: "/",
  },
  {
    id: 6,
    title: "hastalik5",
    description: "hastalik5 description",
    image: "/proje2.jpg",
    tag: ["Hepsi", "Hastalık"],    
    previewUrl: "/",
  },
  {
    id: 7,
    title: "Vücut Kitle İndeksi Hesaplama",
    description: "Vücut kitle indeksinizi hesaplamada size yardımcı olalım.",
    image: "/proje2.jpg",
    tag: ["Hepsi", "Hesaplama"],    
    previewUrl: "/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("Hepsi");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="from-blue-300 via-white to-blue-300 bg-gradient-to-tr">
      <h2 className="text-center text-4xl font-bold text-neutral-700 mt-4 mb-8 md:mb-12 p-5 border-b-2 border-t-2 border-neutral-700">
        Hasta Rehberi
      </h2>
      <div className="text-black flex flex-row justify-center items-center gap-2 py-6 ">
        <ProjectTag
          onClick={handleTagChange}
          name="Hepsi"
          isSelected={tag === "Hepsi"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Hastalık"
          isSelected={tag === "Hastalık"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Rehber"
          isSelected={tag === "Rehber"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Hesaplama"
          isSelected={tag === "Hesaplama"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;