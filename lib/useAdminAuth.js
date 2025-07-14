'use client';
import { useState, useEffect } from 'react';
import { isAuthenticated, logout } from '@/lib/auth';

export const useAdminAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setIsAuth(authStatus);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuth(false);
    // Force page reload to ensure clean state
    window.location.href = '/admin';
  };

  return {
    isAuth,
    isLoading,
    handleLogout
  };
};
