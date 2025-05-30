import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Book = {
  id: number;
  title: string;
  author: string;
};

export const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editBookId, setEditBookId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');

  // Fetch books from backend
  const fetchBooks = () => {
    axios.get<Book[]>('http://localhost:8080/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Start editing a book
  const startEdit = (book: Book) => {
    setEditBookId(book.id);
    setEditTitle(book.title);
    setEditAuthor(book.author);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditBookId(null);
    setEditTitle('');
    setEditAuthor('');
  };

  // Save updated book
  const saveEdit = async (id: number) => {
    try {
      await axios.put(`http://localhost:8080/api/books/${id}`, {
        title: editTitle,
        author: editAuthor,
      });
      setEditBookId(null);
      fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  // Delete book by id
  const deleteBook = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <h2>Books</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map(book => (
            <li key={book.id} style={{ marginBottom: '1rem' }}>
              {editBookId === book.id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                  />
                  <input
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(e.target.value)}
                    required
                  />
                  <button onClick={() => saveEdit(book.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <strong>{book.title}</strong> by {book.author}{' '}
                  <button onClick={() => startEdit(book)}>Edit</button>{' '}
                  <button onClick={() => deleteBook(book.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
