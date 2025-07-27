import React, { useState } from 'react';
import CommentSection from '../components/CommentSection';
import { ReactComponent as HalfLifeRusLogo } from '../vector/hl-rus.svg';

function HalfLifeRus({ darkMode }) {
  const [activeTab, setActiveTab] = useState('description');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

  const screenshots = [
    '/images/HLRus_1.jpg',
    '/images/HLRus_2.jpg',
    '/images/HLRus_3.jpg',
    '/images/HLRus_4.jpg',
    '/images/HLRus_5.jpg',
    '/images/HLRus_6.jpg',
  ];

  const openModal = (index) => {
    setCurrentScreenshotIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToNextScreenshot = () => {
    setCurrentScreenshotIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
  };

  const goToPreviousScreenshot = () => {
    setCurrentScreenshotIndex((prevIndex) => (prevIndex - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="project-page">
      <div className="project-header">
        <HalfLifeRusLogo className="project-icon" />
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
              Русификатор главного меню для Xash3D (WON-Style): <strong>Владислав Сухов ($_Vladislav)</strong><br />
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
              <li><strong>31.07.2023</strong>
              <p>Исправление текстового перевода, добавлен перевод новых строк для Xash3D FWGS 0.20.x/0.21.x</p></li>
              <li><strong>30.07.2021</strong>
              <p>Снова мелкие исправления текста<br />
              Укорачивание или переиначивание текста чтобы влезал в меню (в настройках персонажа, видео и звука)<br />
              Добавлен перевод новой строчки "Покинуть игру" в gameui_russian.txt которая появилась в обновлении Half-Life 1 build 8684 от 3 августа 2020 года в Steam<br />
              Обновлены картинки с переводом WON/Xash3D меню, также добавил картинки в TGA формате для поддержки бета версии Xash3D FWGS 0.20.1</p></li>
              <li><strong>18.07.2020</strong>
              <p>Добавлены некоторые отсутствующие строчки в MainUI, исправления перевода, перенос конфига в папку userconfig.d (чтобы не заменять пользовательский userconfig.cfg)</p></li>
              <li><strong>31.05.2020</strong>
              <p>Добавлен перевод MainUI (пояснительный текст возле кнопок меню и всплывающие сообщения)<br />
              Мелкая корректировка текста</p></li>
              <li><strong>17.05.2019</strong>
              <p>Добавлен перевод главного меню и HD озвучка H.E.V костюма</p></li>
              <li><strong>15.07.2018</strong>
              <p>Первый релиз русификатора</p></li>
            </ul>
          </section>
        )}

        {activeTab === 'screenshots' && (
          <section className="screenshots">
            <h2>Скриншоты</h2>
            <div className="screenshots-grid">
              {screenshots.map((src, index) => (
                <img
                  key={index}
                  src={process.env.PUBLIC_URL + src}
                  alt={`Скриншот ${index + 1}`}
                  className="screenshot"
                  onClick={() => openModal(index)} // Открытие модалки при клике
                />
              ))}
            </div>
          </section>
        )}

        {/* Модальное окно для скриншотов */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>✖</button>
              <button className="modal-prev" onClick={goToPreviousScreenshot}>←</button>
              <img src={process.env.PUBLIC_URL + screenshots[currentScreenshotIndex]} alt="Full screen screenshot" className="modal-image" />
              <button className="modal-next" onClick={goToNextScreenshot}>→</button>
            </div>
          </div>
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