import React, { useState } from 'react';
import axios from 'axios';

export const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/books', {
        title,
        author,
      });
      setTitle('');
      setAuthor('');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
    
      <button type="submit">Add Book</button>
    </form>
  );
};
