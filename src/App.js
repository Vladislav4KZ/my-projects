import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import HalfLifeRus from './pages/HalfLifeRus';
import CounterStrikeRus from './pages/CounterStrikeRus';
import TeamFortressClassicRus from './pages/TeamFortressClassicRus';
import BlueShiftRus from './pages/BlueShiftRus';
import OpposingForceRus from './pages/OpposingForceRus';
import YaPBGraphs from './pages/YaPBGraphs';
import './styles/App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Сразу получаем значение из localStorage при инициализации состояния
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    // Применяем тему немедленно при переключении
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <Router basename="/my-projects">
      <div className={`App ${darkMode ? 'dark-theme' : 'light-theme'}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hl-rus" element={<HalfLifeRus darkMode={darkMode} />} />
            <Route path="/cs-rus" element={<CounterStrikeRus darkMode={darkMode} />} />
            <Route path="/tfc-rus" element={<TeamFortressClassicRus darkMode={darkMode} />} />
            <Route path="/bs-rus" element={<BlueShiftRus darkMode={darkMode} />} />
            <Route path="/of-rus" element={<OpposingForceRus darkMode={darkMode} />} />
            <Route path="/yapb-graphs" element={<YaPBGraphs darkMode={darkMode} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;