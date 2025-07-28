import React, { useState } from 'react';
import CommentSection from '../components/CommentSection';

function CounterStrikeRus({ darkMode }) {
  const [activeTab, setActiveTab] = useState('description'); // Стейт для активной вкладки

  return (
    <div className="project-page">
      <div className="project-header">
        <img src="/images/cs-rus.png" alt="Counter-Strike 1.6 Rus" className="project-icon" />
        <h1>Русификатор Counter-Strike 1.6</h1>
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
            <strong>Авторы:</strong><br />
            Перевод текста: <strong>$_Vladislav</strong><br />
            Русская озвучка радиокоманд: <strong>Неизвестно</strong><br />
            Русская озвучка ботов: <strong>Неизвестно</strong><br />
            <strong>В него входит:</strong>
            <ol>
              <li>Перевод текста</li>
              <li>Перевод радиокоманд</li>
              <li>Перевод меню Xash3D FWGS</li>
              <li>Шрифты с поддержкой кириллицы</li>
              <li>Русская озвучка ботов YaPB и zBot</li>
            </ol>
          </section>
        )}

        {activeTab === 'installation' && (
          <section className="installation">
            <h2>Инструкция по установке</h2>
            <p>Положите CSRusFull.pk3 в директорию cstrike/custom</p>
          </section>
        )}

        {activeTab === 'changelog' && (
          <section className="changelog">
            <h2>Список изменений</h2>
            <ul>
              <li><strong>20.07.2025</strong>
              <ul>
                <li>Русификатор теперь лежит в pk3 архиве (поддерживается только на Xash3D FWGS 0.21)</li>
                <li>Обновлены картинки пунктов главного меню с шрифтом и эффектами близкими к оригиналу</li>
                <li>Переведены обновлённые тач меню покупки оружия, смены команды, cmd menu, bot menu</li>
                <li>Озвучка ботов от BoBa_KoMaTo3HuK теперь скачивается и устанавливается отдельно от русификатора (русская озвучка ботов здесь присутствует, но другая)</li>
                <li>Удалены файлы не относящиеся к русификатору - .nav файлы ZBot, инструкции для ZBot и т.д.</li>
                <li>Выполнен полный перевод главного меню, включая текст подсказок (поддерживается только на новом движке)</li>
              </ul></li>
              <li><strong>18.10.2022</strong>
              <ul>
                <li>Файлы русификатора перемещены в папку custom чтобы не заменять оригинальные файлы игры</li>
                <li>Добавлен конфиг utf-8_charset.cfg в папке custom/userconfig.d для включения кодировки UTF-8 в чате и HUD чтобы исправить крякозябры в текстовых меню на русском языке (консольные команды из рекомендаций теперь вводить не надо)</li>
                <li>Полный перевод картинок в меню (gfx/shell) с нуля, теперь заголовки в меню тоже на русском языке</li>
                <li>Полный перевод с нуля с исправленными ошибками для меню выбора команд/покупки оружия/cmd/bot menu</li>
                <li>Исправлены недействующие кнопки "Himodels" (Модели, выс. качество) и "Minmodels" (Минимум моделей), так как в предыдущей версии русификатора от другого автора они были записаны как консольные команды а не квары</li>
              </ul>
              <strong>Исправлены проблемы в меню покупки оружия:</strong>
              <ul>
                <li>Теперь вы можете покупать MAC-10 в команде террористов</li>
                <li>Исправлено неверное название пистолета Dual Elites на ES Five-Seven в магазине у спецназовцев</li>
                <li>Исправлена проблема с прерывающейся строкой "Тактический щит" в магазине экипировки у спецназовцев</li>
                <li>Теперь в магазине отображаются верные характеристики оружия. Например раньше был написан вес оружия с пустым магазином, но в магазине он был указан как будто он был взвешен с полным магазином. Это была ошибка в меню покупки оружия в CS16Client, даже на английском языке. Сделал так как есть в оригинальной ПК версии Counter-Strike 1.6. (Видимо это была ошибка автора оригинального меню закупки, он тупо копировал и вставлял один и тот же текст без редактирования)</li>
              </ul></li>
              <li><strong>10.07.2018</strong> - Первый выпуск русификатора</li>
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
          <a href="https://disk.yandex.ru/d/lpZgbod3VreS0Q" className="download-btn">Скачать русификатор</a>
        </section>

        <CommentSection darkMode={darkMode} />
      </div>
    </div>
  );
}

export default CounterStrikeRus;