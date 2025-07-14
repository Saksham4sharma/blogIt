import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

const Header = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("email", email);
      
      const response = await axios.post('/api/email', formData);
      
      if (response.data.success) {
        toast.success(response.data.message || "Successfully subscribed!");
        setEmail("");
      } else {
        toast.error(response.data.message || "Subscription failed");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      
      if (error.response?.status === 409) {
        toast.error("Email already subscribed");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid email format");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [email, isSubmitting]);

  return (
    <div className='relative bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden'>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-48 translate-x-48 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-green-100 to-blue-100 rounded-full translate-y-32 -translate-x-32 opacity-30"></div>
      
      <div className='relative z-10 py-8 px-5 md:px-12 lg:px-28'>
        <div className='flex justify-between items-center'>
          <Link href="/" className="group">
            <Image 
              src={assets.blogit_logo} 
              width={180} 
              alt='BlogIt Logo' 
              className='w-[130px] sm:w-auto cursor-pointer transition-transform duration-300 group-hover:scale-105'
              priority
            />
          </Link>
          <Link 
            href="/admin"
            className='group flex items-center gap-2 font-semibold py-2 px-4 sm:py-3 sm:px-6 border-2 border-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:bg-gray-800 hover:text-white transform hover:-translate-y-1'
            aria-label="Admin Login - Access the admin dashboard"
          >
            <span>Admin Panel</span>
            <Image 
              src={assets.arrow} 
              alt="Arrow icon" 
              width={16} 
              height={16} 
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
        
        <div className='text-center my-12 space-y-8'>
          <div className="space-y-4 animate-slide-in-top">
            <h1 className='text-4xl sm:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent leading-tight animate-gradient'>
              Latest Blogs
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full animate-pulse"></div>
          </div>
          
          <p className='mt-8 max-w-[800px] m-auto text-base sm:text-lg text-gray-600 leading-relaxed font-medium animate-slide-in-bottom'>
            Discover insightful articles and stay updated with the latest trends in technology, 
            lifestyle, and startup innovations. Join our community of readers today.
          </p>
          
          <form 
            onSubmit={handleSubmit} 
            className='group flex max-w-[520px] mx-auto mt-12 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-modern hover:shadow-modern-lg transition-all duration-500 overflow-hidden hover:border-blue-300 animate-slide-in-bottom focus-ring'
            aria-label="Newsletter subscription"
          >
            <input 
              onChange={handleEmailChange} 
              value={email} 
              type="email" 
              placeholder='Enter your email address' 
              className='pl-6 py-4 outline-none flex-1 text-base bg-transparent placeholder-gray-500 focus-ring' 
              required 
              disabled={isSubmitting}
              aria-label="Email address"
            />
            <button 
              type='submit' 
              className='py-4 px-8 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white font-semibold hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-inner animate-gradient focus-ring'
              disabled={isSubmitting}
              aria-label="Subscribe to newsletter"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Subscribing...</span>
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  Subscribe
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>
          </form>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mt-6 animate-fade-in">
            
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Spam-free weekly insights</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
