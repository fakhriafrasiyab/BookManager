import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

export const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/books').then((res) => setBooks(res.data));
  }, []);

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          {book.title} - {book.author} ({book.year})
        </li>
      ))}
    </ul>
  );
};
