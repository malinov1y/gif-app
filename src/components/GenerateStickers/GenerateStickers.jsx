import React, { useState, useEffect } from 'react';
import './generateStickers.scss';
import SearchForm from '../searchForm/SearchForm';
import ModalWindow from '../ModalWindow/ModalWindow';
import { API_KEY } from '../../config';

const GenerateStickers = () => {
  const [error, setError] = useState('');
  const [stickers, setStickers] = useState([]);
  const [selectedSticker, setSelectedSticker] = useState(null);

  const fetchStickers = async (title, limit) => {
    if (!title.trim()) {
      setError('Введите тему');
      return;
    }

    if (!limit || isNaN(limit)) {
      limit = 5;
    }

    try {
      let total = localStorage.getItem(`total_count_stickers_${title}`);

      if (!total) {
        const countResponse = await fetch(
          `https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}&q=${title}&limit=${limit}&rating=g&lang=en`
        );

        if (!countResponse.ok) {
          throw new Error('Ошибка при получении количества стикеров');
        }

        const countData = await countResponse.json();
        total = countData.pagination.total_count;

        localStorage.setItem(`total_count_stickers_${title}`, total);
      }

      const maxOffset = Math.max(total - limit, 0);
      const randomOffset = Math.floor(Math.random() * maxOffset);

      const response = await fetch(
        `https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}&q=${title}&limit=${limit}&offset=${randomOffset}&rating=g&lang=en`
      );

      if (!response.ok) {
        throw new Error('Стикеры не найдены');
      }

      const data = await response.json();
      setStickers(data.data);
      setError('');
    } catch (err) {
      setError(err.message || 'Произошла ошибка');
    }
  };

  const fetchTrendingStickers = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/stickers/trending?api_key=${API_KEY}&limit=50`
      );

      if (!response.ok) {
        throw new Error('Не удалось загрузить популярные стикеры');
      }

      const data = await response.json();
      setStickers(data.data);
      setError('');
    } catch (err) {
      setError(err.message || 'Произошла ошибка');
    }
  };

  useEffect(() => {
    fetchTrendingStickers();
  }, []);

  const handleSubmit = (title, limit) => {
    fetchStickers(title, limit);
  };

  return (
    <div className="sticker-generator">
      <h1 className="sticker-generator__title">Генератор Stickers</h1>
      <SearchForm onSubmit={handleSubmit} />
      {error && <p className="sticker-generator__error">{error}</p>}
      <div className="sticker-gallery">
        {stickers.map((sticker) => (
          <div
          key={sticker.id}
          className="sticker-gallery__item"
          onClick={() => setSelectedSticker(sticker)}
        >
            <img className="sticker-gallery__image" src={sticker.images.fixed_height.url} alt={sticker.title} />
          </div>
        ))}
      </div>

      {selectedSticker && (
        <ModalWindow item={selectedSticker} onClose={() => setSelectedSticker(null)} />
      )}
    </div>
  );
};

export default GenerateStickers;
