import React, { useState } from 'react';
import CommentSection from '../components/CommentSection';

function TeamFortressClassicRus({ darkMode }) {
  const [activeTab, setActiveTab] = useState('description'); // Стейт для активной вкладки

  return (
    <div className="project-page">
      <div className="project-header">
        <img src="/images/tfc-rus.png" alt="Team Fortress Classic Rus" className="project-icon" />
        <h1>Русификатор Team Fortress Classic</h1>
      </div>

      <div className="tab-buttons">
        <button onClick={() => setActiveTab('description')} className={activeTab === 'description' ? 'active' : ''}>
          Описание
        </button>
        <button onClick={() => setActiveTab('installation')} className={activeTab === 'installation' ? 'active' : ''}>
          Установка
        </button>
        <button onClick={() => setActiveTab('changelog')} className={activeTab === 'changelog' ? 'active' : ''}>
          Список изменений
        </button>
        <button onClick={() => setActiveTab('screenshots')} className={activeTab === 'screenshots' ? 'active' : ''}>
          Скриншоты
        </button>
      </div>

      <div className="project-content">
        {activeTab === 'description' && (
          <section className="description">
            <h2>Описание</h2>
            <p>Полная русификация Team Fortress Classic. Переведены все тексты, команды, сообщения и интерфейс игры.</p>
          </section>
        )}

        {activeTab === 'installation' && (
          <section className="installation">
            <h2>Инструкция по установке</h2>
            <ol>
              <li>Скачайте архив с русификатором</li>
              <li>Распакуйте содержимое архива в папку с игрой</li>
              <li>Запустите игру и выберите русский язык в настройках</li>
            </ol>
          </section>
        )}

        {activeTab === 'changelog' && (
          <section className="changelog">
            <h2>Список изменений</h2>
            <ul>
              <li>v1.0 - Первоначальный релиз</li>
              <li>v1.1 - Исправлены опечатки в названиях классов</li>
              <li>v1.2 - Обновлен перевод сообщений о захвате точек</li>
            </ul>
          </section>
        )}

        {activeTab === 'screenshots' && (
          <section className="screenshots">
            <h2>Скриншоты</h2>
            {/* Скриншоты будут добавлены позже */}
          </section>
        )}

        <section className="download">
          <a href="#" className="download-btn">Скачать русификатор</a>
        </section>

        <CommentSection darkMode={darkMode} />
      </div>
    </div>
  );
}

export default TeamFortressClassicRus;