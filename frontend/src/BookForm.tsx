import React, { useState } from 'react';
import axios from 'axios';

export const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState(2023);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/books', { title, author, year });
    setTitle('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(Number(e.target.value))} />
      <button type="submit">Add Book</button>
    </form>
  );
};
