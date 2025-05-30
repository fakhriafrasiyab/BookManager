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
    axios.get('http://localhost:8080/api/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Books</h1>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul>
          {books.map(book => (
            <li key={book.id}>{book.title} by {book.author} ({book.year})</li>
          ))}
        </ul>
      )}
    </div>
  );
};
