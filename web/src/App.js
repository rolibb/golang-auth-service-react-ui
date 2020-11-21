import React, { useState } from 'react';
import './App.css';
import Layout from './layout';
import { SessionProvider } from './shared/contexts/session';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <div className="root">
      <SessionProvider value={{ isAuthenticated, setAuthenticated }}>
        <Layout />
      </SessionProvider>
    </div>
  );
}

export default App;
