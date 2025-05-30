import React from 'react';
import { BookForm } from './BookForm';
import { BookList } from './BookList';

function App() {
  return (
    <div>
      <h1>Book Manager</h1>
      <BookForm />
      <BookList />
    </div>
  );
}

export default App;
