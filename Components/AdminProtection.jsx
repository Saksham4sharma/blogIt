'use client';
import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '@/lib/auth';
import AdminLogin from '@/Components/AdminLogin';

const AdminProtection = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setIsAuth(authStatus);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsAuth(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuth) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default AdminProtection;
