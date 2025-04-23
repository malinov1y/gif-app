import React, { useState } from "react";
import './searchForm.scss';

const SearchForm = (props) => {
    const [title, setTitle] = useState('');
    const [limit, setLimit] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(title, limit);
        setTitle('');
        setLimit('');
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
          <input
            className="input"
            type="search"
            value={title}
            onChange={handleTitleChange}
            placeholder="Введите тему GIF..."
          />
          <input
            className="input"
            type="number"
            value={limit}
            onChange={handleLimitChange}
            placeholder="Количество GIF"
          />
          <button className="button" type="submit">Поиск</button>
        </form>
      );
};

export default SearchForm;