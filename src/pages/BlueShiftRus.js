import React from 'react';
import CommentSection from '../components/CommentSection';

function BlueShiftRus() {
  return (
    <div className="project-page">
      <div className="project-header">
        <img src="/images/bs-rus.png" alt="Half-Life: Blue Shift Rus" className="project-icon" />
        <h1>Русификатор Half-Life: Blue Shift</h1>
      </div>
      
      <div className="project-content">
        <section className="screenshots">
          <h2>Скриншоты</h2>
          {/* Скриншоты будут добавлены позже */}
        </section>
        
        <section className="description">
          <h2>Описание</h2>
          <p>Полная русификация аддона Half-Life: Blue Shift. Переведены все тексты, диалоги и интерфейс дополнения.</p>
        </section>
        
        <section className="installation">
          <h2>Инструкция по установке</h2>
          <ol>
            <li>Убедитесь, что у вас установлен Half-Life с Blue Shift</li>
            <li>Скачайте архив с русификатором</li>
            <li>Распакуйте содержимое архива в папку с игрой</li>
            <li>Запустите игру и выберите русский язык в настройках</li>
          </ol>
        </section>
        
        <section className="changelog">
          <h2>Список изменений</h2>
          <ul>
            <li>v1.0 - Первоначальный релиз</li>
            <li>v1.1 - Исправлены опечатки в диалогах</li>
            <li>v1.2 - Обновлен перевод терминалов</li>
          </ul>
        </section>
        
        <section className="download">
          <a href="#" className="download-btn">Скачать русификатор</a>
        </section>
        
        <CommentSection />
      </div>
    </div>
  );
}

export default BlueShiftRus;