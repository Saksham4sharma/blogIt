'use client';
import React, { useState } from 'react';
import { setAuthenticated } from '@/lib/auth';
import { toast } from 'react-toastify';
import { assets } from '@/Assets/assets';
import Image from 'next/image';
import axios from 'axios';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting || isLocked) return;
    
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/admin/auth', {
        password
      });

      if (response.data.success) {
        setAuthenticated();
        toast.success('Login successful! Welcome to admin dashboard.');
        setAttemptCount(0); // Reset attempts on success
        onLogin();
      } else {
        const newAttemptCount = attemptCount + 1;
        setAttemptCount(newAttemptCount);
        
        if (newAttemptCount >= 3) {
          setIsLocked(true);
          toast.error('Too many failed attempts! Please wait 30 seconds.');
          setTimeout(() => {
            setIsLocked(false);
            setAttemptCount(0);
          }, 30000);
        } else {
          const remainingAttempts = 3 - newAttemptCount;
          toast.error(`Invalid password. ${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} remaining.`);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response?.status === 401) {
        const newAttemptCount = attemptCount + 1;
        setAttemptCount(newAttemptCount);
        
        if (newAttemptCount >= 3) {
          setIsLocked(true);
          toast.error('Too many failed attempts! Please wait 30 seconds.');
          setTimeout(() => {
            setIsLocked(false);
            setAttemptCount(0);
          }, 30000);
        } else {
          const remainingAttempts = 3 - newAttemptCount;
          toast.error(`Invalid password. ${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} remaining.`);
        }
      } else {
        toast.error('Connection failed. Please check your internet and try again.');
      }
    }
    
    setIsSubmitting(false);
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Image 
              src={assets.blogit_logo} 
              alt='BlogIt Logo' 
              width={150} 
              height={50}
              className="w-auto h-12"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter admin password to access the BlogIt dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              Admin Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm ${
                isLocked 
                  ? 'border-red-500 bg-red-50' 
                  : attemptCount > 0 
                    ? 'border-yellow-500 bg-yellow-50' 
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
              placeholder={isLocked ? "Account temporarily locked" : "Enter admin password"}
              disabled={isSubmitting || isLocked}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting || isLocked}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed ${
                isLocked
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500 opacity-50'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:opacity-50'
              }`}
            >
              {isLocked 
                ? 'Account Locked (30s)' 
                : isSubmitting 
                  ? 'Signing in...' 
                  : 'Sign in'
              }
            </button>
          </div>
        </form>
        
        {/* Security Information */}
        <div className="mt-6 space-y-3">
          {attemptCount > 0 && !isLocked && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                ⚠️ Warning: {attemptCount} failed attempt{attemptCount !== 1 ? 's' : ''}. 
                {3 - attemptCount} remaining before temporary lockout.
              </p>
            </div>
          )}
          
          {isLocked && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">
                🔒 Account temporarily locked due to multiple failed attempts. 
                Please wait 30 seconds before trying again.
              </p>
            </div>
          )}
          
          
        </div>
        
      </div>
    </div>
  );
};

export default AdminLogin;
