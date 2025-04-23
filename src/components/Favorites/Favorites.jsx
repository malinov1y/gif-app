import React, { useState, useEffect } from 'react';
import './favorites.scss';
import { FAVORITES_DATA } from '../../config';

const Favorites = () => {
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(FAVORITES_DATA)) || [];
    setMediaItems(stored);
  }, []);

  const handleRemove = (id) => {
    const updated = mediaItems.filter(item => item.id !== id);
    setMediaItems(updated);
    localStorage.setItem(FAVORITES_DATA, JSON.stringify(updated));
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => alert('Ссылка скопирована в буфер обмена!'))
      .catch(err => {
        alert('Не удалось скопировать ссылку');
        console.error(err);
      });
  };

  const handleSave = (url, title) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.gif`;
    link.target = "_blank";
    link.click();
  };

  return (
    <div className="media-container">
      <h1 className="media-container__title">Избранные GIF и Stickers</h1>
      {mediaItems.length === 0 ? (
        <p className="media-container__error">У вас нет избранных медиа!</p>
      ) : (
        <div className="media-list">
          {mediaItems.map((item) => (
            <div key={item.id} className="media-item">
              <img className="media-item__image" src={item.images.fixed_height.url} alt={item.title} />
              <div className="media-buttons">
                <button className="media-buttons__button" onClick={() => handleCopyLink(item.images.original.url)}>
                  Копировать ссылку
                </button>
                <button className="media-buttons__button" onClick={() => handleSave(item.images.original.url, item.title)}>
                  Скачать
                </button>
                <button className="media-buttons__button" onClick={() => handleRemove(item.id)}>
                  Удалить из избранного
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
