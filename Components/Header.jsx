import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
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
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Image 
          src={assets.logo} 
          width={180} 
          alt='Blog Logo' 
          className='w-[130px] sm:w-auto'
          priority
        />
        <button 
          className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] hover:shadow-[-5px_5px_0px_#000000] transition-all duration-200'
          aria-label="Get started"
        >
          Get started 
          <Image 
            src={assets.arrow} 
            alt="Arrow icon" 
            width={16} 
            height={16} 
          />
        </button>
      </div>
      
      <div className='text-center my-8'>
        <h1 className='text-3xl sm:text-5xl font-medium animate-fade-in'>
          Latest Blogs
        </h1>
        <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base text-gray-600 leading-relaxed'>
          Discover insightful articles and stay updated with the latest trends in technology, 
          lifestyle, and startup innovations. Join our community of readers today.
        </p>
        
        <form 
          onSubmit={handleSubmit} 
          className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000] hover:shadow-[-5px_5px_0px_#000000] transition-all duration-200'
          aria-label="Newsletter subscription"
        >
          <input 
            onChange={handleEmailChange} 
            value={email} 
            type="email" 
            placeholder='Enter your email' 
            className='pl-4 outline-none flex-1 text-sm sm:text-base' 
            required 
            disabled={isSubmitting}
            aria-label="Email address"
          />
          <button 
            type='submit' 
            className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={isSubmitting}
            aria-label="Subscribe to newsletter"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
