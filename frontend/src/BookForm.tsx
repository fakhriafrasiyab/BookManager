import React, { useState } from 'react';
import axios from 'axios';

type Props = {
  onBookAdded: () => void;  // callback to refresh list
};

export const BookForm: React.FC<Props> = ({ onBookAdded }) => {
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
      onBookAdded(); // refresh book list
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
        required
      />
      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <button type="submit">Add Book</button>
    </form>
  );
};
