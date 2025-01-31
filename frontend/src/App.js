import React, { useState } from 'react';
import AddUser from './pages/AddUser';
import Display from './pages/Display';

export default function App() {
  const [refresh, setRefresh] = useState(false);

  function handleUserAdded() {
    setRefresh(!refresh);
  }

  return (
    <div>
      <AddUser onUserAdded={handleUserAdded} />
      <Display key={refresh} />
    </div>
  );
}
