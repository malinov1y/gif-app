import React from 'react';
import './modalWindow.scss';
import { FAVORITES_DATA } from '../../config';

const ModalWindow = (props) => {
  const selectedItem = props.item;

  const handleCopyLink = () => {
    const gifUrl = selectedItem.images.original.url;
    navigator.clipboard.writeText(gifUrl)
      .then(() => alert('Ссылка скопирована в буфер обмена!'))
      .catch(err => {
        alert('Не удалось скопировать ссылку');
        console.error(err);
      });
  };

  const handleSave = () => {
    const link = document.createElement('a');
    link.href = selectedItem.images.original.url;
    link.download = `${selectedItem.title}.gif`;
    link.target = "_blank";
    link.click();
  };

  const handleAddToFavorites = () => {
    const prevData = JSON.parse(localStorage.getItem(FAVORITES_DATA)) || [];
    const exists = prevData.some(gif => gif.id === selectedItem.id);

    if (exists) {
      alert('Эта гифка уже в избранном!');
      return;
    }

    localStorage.setItem(FAVORITES_DATA, JSON.stringify([...prevData, selectedItem]));
    alert('Гифка добавлена в избранное!');
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={props.onClose}>
          &times;
        </button>
        <img src={selectedItem.images.original.url} alt={selectedItem.title} />
        <div className="modal-buttons">
          <button onClick={handleCopyLink}>Копировать ссылку</button>
          <button onClick={handleSave}>Скачать</button>
          <button onClick={handleAddToFavorites}>Добавить в избранное</button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;