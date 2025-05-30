import React from 'react';
import { BookForm } from './BookForm';
import { BookList } from './BookList';

const App: React.FC = () => {
  // To allow BookForm to refresh BookList, we move fetch to App level or use an event system
  // But to keep it simple, I'll use a state here and pass a callback

  const [refreshKey, setRefreshKey] = React.useState(0);

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>📚 Book Manager</h1>
      <BookForm onBookAdded={triggerRefresh} />
      <hr style={{ margin: '2rem 0' }} />
      {/* Key prop forces remount to refetch */}
      <BookList key={refreshKey} />
    </div>
  );
};

export default App;
