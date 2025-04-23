import React, { useState, useEffect } from 'react';
import './favorites.scss';
import { FAVOTITES_DATA } from '../../config';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem(FAVOTITES_DATA)) || [];
        setFavorites(storedFavorites);
    }, []);

    const handleRemoveFavorites = (gifId) => {
        const updatedFavorites = favorites.filter(gif => gif.id !== gifId);
        setFavorites(updatedFavorites);
        localStorage.setItem(FAVOTITES_DATA, JSON.stringify(updatedFavorites));
    };

    const handleCopyLink = (gifUrl) => {
        navigator.clipboard.writeText(gifUrl).then(() => {
          alert('Ссылка скопирована в буфер обмена!');
        }).catch(err => {
          alert('Не удалось скопировать ссылку');
          console.error(err);
        });
    };

    const handleSave = (gifUrl, gifTitle) => {
        const link = document.createElement('a');
        link.href = gifUrl;
        link.download = `${gifTitle}.gif`;
        link.target = "_blank";
        link.click();
    };

    return (
        <div className="favorites-container">
            <h1 className="favorites-title">Избранные GIF</h1>
            {favorites.length === 0 ? (
                <p className="favorites-error">У вас нет избранных GIF!</p>
            ) : (
                <div className="favorites-list">
                    {favorites.map((gif) => (
                        <div key={gif.id} className="favorites-item">
                            <img src={gif.images.fixed_height.url} alt={gif.title} />
                            <div className="favorites-buttons">
                                <button onClick={() => handleCopyLink(gif.images.original.url)}>
                                    Копировать ссылку
                                </button>
                                <button onClick={() => handleSave(gif.images.original.url, gif.title)}>
                                    Скачать
                                </button>
                                <button onClick={() => handleRemoveFavorites(gif.id)}>
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