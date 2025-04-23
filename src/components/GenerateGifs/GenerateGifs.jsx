import React, { useState, useEffect } from 'react'
import './generateGifs.scss'
import SearchForm from '../searchForm/SearchForm';
import { API_KEY } from '../../config';
import { FAVOTITES_DATA } from '../../config';

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
  }, [])

  const handleSubmit = (title, limit) => {
    fetchGif(title, limit);
  };

  const handleGifClick = (gif) => {
    setSelectedGif(gif);
  };

  const handleCloseModal = () => {
    setSelectedGif(null);
  };

  const handleCopyLink = () => {
    const gifUrl = selectedGif.images.original.url;
    navigator.clipboard.writeText(gifUrl).then(() => {
      alert('Ссылка скопирована в буфер обмена!');
    }).catch(err => {
      alert('Не удалось скопировать ссылку');
      console.error(err);
    });
  };

  const handleSave = () => {
    const link = document.createElement('a');
    link.href = selectedGif.images.original.url;
    link.download = `${selectedGif.title}.gif`;
    link.target = "_blank";
    link.click();
  };

  const handleAddToFavorites = () => {
    const prevData = JSON.parse(localStorage.getItem(FAVOTITES_DATA)) || [];

    const gifExists = prevData.some(gif => gif.id === selectedGif.id);
    if (gifExists) {
      alert('Эта гифка уже в избранном!');
      return;
    }

    localStorage.setItem(FAVOTITES_DATA, JSON.stringify([...prevData, selectedGif]));
    alert('Гифка добавлена в избранное!');
  };

  return (
    <div className="app">
      <h1 className="title">Генератор GIF</h1>
      <SearchForm onSubmit={handleSubmit} />
      {error && <p className="error">{error}</p>}
      <div className="gif-container">
        {gifs.map((gif) => (
          <div key={gif.id} className="gif-card" onClick={() => handleGifClick(gif)}>
            <img src={gif.images.fixed_height.url} alt={gif.title} />
          </div>
        ))}
      </div>

      {selectedGif && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={handleCloseModal}>
              &times;
            </button>
            <img src={selectedGif.images.original.url} alt={selectedGif.title} />
            <div className="modal-buttons">
              <button onClick={handleCopyLink}>Копировать ссылку</button>
              <button onClick={handleSave}>Скачать</button>
              <button onClick={handleAddToFavorites}>Добавить в избранное</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GenerateGifs;
