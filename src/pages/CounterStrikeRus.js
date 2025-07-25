import React from 'react';
import CommentSection from '../components/CommentSection';

function CounterStrikeRus({ darkMode }) {
  return (
    <div className="project-page">
      <div className="project-header">
        <img src="/images/cs-rus.png" alt="Counter-Strike 1.6 Rus" className="project-icon" />
        <h1>Русификатор Counter-Strike 1.6</h1>
      </div>
      
      <div className="project-content">
        <section className="screenshots">
          <h2>Скриншоты</h2>
          {/* Скриншоты будут добавлены позже */}
        </section>
        
        <section className="description">
          <h2>Описание</h2>
          <p>Полная русификация классического Counter-Strike 1.6. Переведены все тексты, меню, сообщения и интерфейс игры.</p>
        </section>
        
        <section className="installation">
          <h2>Инструкция по установке</h2>
          <ol>
            <li>Скачайте архив с русификатором</li>
            <li>Распакуйте содержимое архива в папку с игрой</li>
            <li>Запустите игру и выберите русский язык в настройках</li>
          </ol>
        </section>
        
        <section className="changelog">
          <h2>Список изменений</h2>
          <ul>
            <li>v1.0 - Первоначальный релиз</li>
            <li>v1.1 - Исправлены опечатки в меню</li>
            <li>v1.2 - Обновлен перевод сообщений в чате</li>
          </ul>
        </section>
        
        <section className="download">
          <a href="#" className="download-btn">Скачать русификатор</a>
        </section>
        
        <CommentSection darkMode={darkMode} />
      </div>
    </div>
  );
}

export default CounterStrikeRus;