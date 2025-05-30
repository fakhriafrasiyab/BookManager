import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Book = {
  id: number;
  title: string;
  author: string;
};

export const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios.get<Book[]>('http://localhost:8080/api/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  return (
    <div>
      <h2>Books</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map(book => (
            <li key={book.id}>{book.title} by {book.author}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
