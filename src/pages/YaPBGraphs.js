import React from 'react';
import CommentSection from '../components/CommentSection';

function YaPBGraphs() {
  return (
    <div className="project-page">
      <div className="project-header">
        <img src="/images/yapb.png" alt="YaPB Графы" className="project-icon" />
        <h1>Графы для YaPB</h1>
      </div>
      
      <div className="project-content">
        <section className="screenshots">
          <h2>Скриншоты</h2>
          {/* Скриншоты будут добавлены позже */}
        </section>
        
        <section className="description">
          <h2>Описание</h2>
          <p>Набор графов для ботов YaPB в различных играх серии Half-Life. Позволяет ботам эффективно перемещаться по картам.</p>
        </section>
        
        <section className="installation">
          <h2>Инструкция по установке</h2>
          <ol>
            <li>Убедитесь, что у вас установлены боты YaPB</li>
            <li>Скачайте архив с графами</li>
            <li>Распакуйте содержимое архива в папку bots/yapb/graphs</li>
            <li>Перезапустите игру</li>
          </ol>
        </section>
        
        <section className="changelog">
          <h2>Список изменений</h2>
          <ul>
            <li>v1.0 - Первоначальный релиз с графами для 10 карт</li>
            <li>v1.1 - Добавлены графы для 5 новых карт</li>
            <li>v1.2 - Оптимизированы маршруты для улучшения производительности</li>
          </ul>
        </section>
        
        <section className="download">
          <a href="#" className="download-btn">Скачать графы</a>
        </section>
        
        <CommentSection />
      </div>
    </div>
  );
}

export default YaPBGraphs;