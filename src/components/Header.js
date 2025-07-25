import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          $_Vladislav's Projects
        </Link>
      </div>
    </header>
  );
}

export default Header;