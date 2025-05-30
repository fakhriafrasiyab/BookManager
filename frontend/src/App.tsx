import React from 'react';
import { BookForm } from './BookForm';
import { BookList } from './BookList';

const App: React.FC = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>📚 Book Manager</h1>
      <BookForm />
      <hr style={{ margin: '2rem 0' }} />
      <BookList />
    </div>
  );
};

export default App;
