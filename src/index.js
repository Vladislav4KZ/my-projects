import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Проверяем сохраненную тему при загрузке
const savedTheme = localStorage.getItem('darkMode');
if (savedTheme === 'true') {
  document.documentElement.setAttribute('data-theme', 'dark');
} else {
  document.documentElement.setAttribute('data-theme', 'light');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);