import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          $_Vladislav's Projects
        </Link>
        <nav className="nav">
          <button 
            className="theme-toggle" 
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Переключиться на светлую тему" : "Переключиться на тёмную тему"}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;