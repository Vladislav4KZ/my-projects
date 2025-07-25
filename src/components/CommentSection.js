import React, { useEffect, useRef } from 'react';

const CommentSection = ({ darkMode }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'Vladislav4KZ/my-projects');
    script.setAttribute('data-repo-id', 'РЕПО_ID'); // копируется с giscus.app
    script.setAttribute('data-category', 'Общая категория');
    script.setAttribute('data-category-id', 'ID_КАТЕГОРИИ'); // тоже с giscus.app
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    script.setAttribute('data-lang', 'ru');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    const container = containerRef.current;
    container.innerHTML = ''; // очищаем, чтобы избежать дублирования
    container.appendChild(script);
  }, [darkMode]);

  return <div ref={containerRef} />;
};

export default CommentSection;