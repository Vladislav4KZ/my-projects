import React, { useState } from 'react';
import CommentSection from '../components/CommentSection';

function HalfLifeRus({ darkMode }) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="project-page">
      <div className="project-header">
        <img src="/images/hl-rus.png" alt="Half-Life Rus" className="project-icon" />
        <h1>Русификатор Half-Life</h1>
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
            <h3>Авторы:</h3>
            <p>
              Русификатор текста: <strong>$_Vladislav</strong><br />
              Русификатор озвучки: <strong>«XXI век», Triada Games, Buka Entertainment, 7Wolf, Fargus и Kudos.</strong><br />
              Озвучка солдатов: <strong>Пётр Бойко</strong><br />
              Озвучка оповещений Чёрной Мезы: <strong>Евгений Синельников</strong><br />
              Русификатор главного меню для Xash3D (WON-Style): <strong>Владислав Сухов ( $_Vladislav )</strong><br />
              Озвучка H.E.V костюма в HD качестве: <strong>Buka Entertainment</strong><br />
              Русификатор MainUI Xash3D: <strong>$_Vladislav</strong>
            </p>

            <h3>В него входит:</h3>
            <ol>
              <li>Русификатор текста</li>
              <li>Русификатор озвучки</li>
              <li>Русские шрифты</li>
              <li>Русификатор главного меню</li>
            </ol>
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
              <li>v1.1 - Исправлены опечатки</li>
              <li>v1.2 - Обновлен перевод диалогов</li>
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

        <CommentSection darkMode={darkMode} term="HalfLifeRus" />
      </div>
    </div>
  );
}

export default HalfLifeRus;