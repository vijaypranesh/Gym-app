import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const [page, setPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
      setPage('dashboard');
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setPage('dashboard');
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPage('login');
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        page === 'login' ? (
          <Login onLogin={handleLogin} onSwitchToRegister={() => setPage('register')} />
        ) : (
          <Register onRegister={handleRegister} onSwitchToLogin={() => setPage('login')} />
        )
      )}
    </div>
  );
}

export default App;
