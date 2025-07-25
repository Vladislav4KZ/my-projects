import React from 'react';
import ProjectCard from '../components/ProjectCard';

function Home() {
  const projects = [
    {
      title: "Русификатор Half-Life",
      image: "/images/hl-rus.png",
      description: "Полная русификация оригинальной Half-Life",
      link: "/hl-rus"
    },
    {
      title: "Русификатор Counter-Strike 1.6",
      image: "/images/cs-rus.png",
      description: "Русификация классического Counter-Strike",
      link: "/cs-rus"
    },
    {
      title: "Русификатор Team Fortress Classic",
      image: "/images/tfc-rus.png",
      description: "Русский язык для Team Fortress Classic",
      link: "/tfc-rus"
    },
    {
      title: "Русификатор Half-Life: Blue Shift",
      image: "/images/bs-rus.png",
      description: "Русификация аддона Blue Shift",
      link: "/bs-rus"
    },
    {
      title: "Русификатор Half-Life: Opposing Force",
      image: "/images/of-rus.png",
      description: "Русский язык для Opposing Force",
      link: "/of-rus"
    },
    {
      title: "Графы для YaPB",
      image: "/images/yapb.png",
      description: "Набор графов для ботов YaPB",
      link: "/yapb-graphs"
    }
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>$_Vladislav's Projects</h1>
        <p>Русификаторы для классических игр и полезные дополнения</p>
      </div>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            image={project.image}
            description={project.description}
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;