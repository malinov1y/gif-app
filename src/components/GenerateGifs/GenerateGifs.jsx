import React, { useState, useEffect } from 'react';
import './generateGifs.scss';
import SearchForm from '../searchForm/SearchForm';
import ModalWindow from '../ModalWindow/ModalWindow';
import { API_KEY } from '../../config';

const GenerateGifs = () => {
  const [error, setError] = useState('');
  const [gifs, setGifs] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);

  const fetchGif = async(title, limit) => {
    if (!title.trim()) {
      setError('Введите тему');
      return;
    }

    if (!limit || isNaN(limit)) {
      limit = 5;
    }

    try {
      let total = localStorage.getItem(`total_count_${title}`);

      if (!total) {
        const countResponce = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${title}&limit=${limit}&rating=g&lang=en`
        );

        if (!countResponce.ok) {
          throw new Error('Ошибка при получении количества GIF');
        }

        const countData = await countResponce.json();
        total = countData.pagination.total_count;

        localStorage.setItem(`total_count_${title}`, total);
      }

      const maxOffset = Math.max(total - limit, 0);
      const randomOffset = Math.floor(Math.random() * maxOffset);


      const responce = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${title}&limit=${limit}&offset=${randomOffset}&rating=g&lang=en`
      );

      if (!responce.ok) {
        throw new Error('GIF не найдены');
      }

      const data = await responce.json();
      console.log(data);
      setGifs(data.data);
      setError('');
    }
    catch (err) {
      setError(err.message || 'Произошла ошибка');
    }
  };

  const fetchTrendingGifs = async () => {
    try {
      const responce = await fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=50`
      );

      if (!responce.ok) {
        throw new Error('Не удалось загрузить популярные GIF');
      }

      const data = await responce.json();
      setGifs(data.data);
      setError('');
    }
    catch (err) {
      setError(err.message || 'Произошла ошибка')
    }
  };

  useEffect(() => {
    fetchTrendingGifs();
  }, []);

  const handleSubmit = (title, limit) => {
    fetchGif(title, limit);
  };

  return (
    <div className="gif-generator">
      <h1 className="gif-generator__title">Генератор GIF</h1>
      <SearchForm onSubmit={handleSubmit} />
      {error && <p className="gif-generator__error">{error}</p>}

      <div className="gif-gallery">
        {gifs.map((gif) => (
          <div
            key={gif.id}
            className="gif-gallery__item"
            onClick={() => setSelectedGif(gif)}
          >
            <img className="gif-gallery__item-img" src={gif.images.fixed_height.url} alt={gif.title} />
          </div>
        ))}
      </div>

      {selectedGif && (
        <ModalWindow item={selectedGif} onClose={() => setSelectedGif(null)} />
      )}
    </div>
  );
};

export default GenerateGifs;