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
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router basename="/my-projects">
      <div className={`App ${darkMode ? 'dark-theme' : 'light-theme'}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hl-rus" element={<HalfLifeRus />} />
            <Route path="/cs-rus" element={<CounterStrikeRus />} />
            <Route path="/tfc-rus" element={<TeamFortressClassicRus />} />
            <Route path="/bs-rus" element={<BlueShiftRus />} />
            <Route path="/of-rus" element={<OpposingForceRus />} />
            <Route path="/yapb-graphs" element={<YaPBGraphs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;