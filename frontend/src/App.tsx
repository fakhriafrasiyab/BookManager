import React, { useEffect, useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/books')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched books:', data); // Debugging log
        setBooks(data);
      })
      .catch(error => {
        console.error('Error fetching books:', error); // Error log
      });
  }, []);

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <b>{book.title}</b> by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
