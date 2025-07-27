import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProjectCard.css';

function ProjectCard({ title, image, description, link }) {
  return (
    <Link to={link} className="project-card">
      <img src={process.env.PUBLIC_URL + image} alt={title} className="project-image" />
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <div className="project-link-container">
          <span className="project-link">Подробнее</span>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;