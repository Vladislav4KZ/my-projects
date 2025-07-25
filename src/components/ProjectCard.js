import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProjectCard.css';

function ProjectCard({ title, image, description, link }) {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-image" />
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <Link to={link} className="project-link">Подробнее</Link>
      </div>
    </div>
  );
}

export default ProjectCard;