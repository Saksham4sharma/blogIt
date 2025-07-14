'use client'
import { assets } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';

const BlogDetailPage = ({ params }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/blog', {
        params: { id: params.id }
      });
      
      if (response.data.success) {
        setBlog(response.data.blog);
      } else {
        throw new Error(response.data.message || 'Blog not found');
      }
    } catch (error) {
      console.error("Failed to fetch blog:", error);
      setError(error.response?.status === 404 ? 'Blog not found' : 'Failed to load blog');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  const socialShareLinks = [
    {
      name: 'Facebook',
      icon: assets.facebook_icon,
      url: `https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}`,
      ariaLabel: 'Share on Facebook'
    },
    {
      name: 'Twitter',
      icon: assets.twitter_icon,
      url: `https://twitter.com/intent/tweet?url=${typeof window !== 'undefined' ? window.location.href : ''}&text=${blog?.title || ''}`,
      ariaLabel: 'Share on Twitter'
    },
    {
      name: 'Google Plus',
      icon: assets.googleplus_icon,
      url: `https://plus.google.com/share?url=${typeof window !== 'undefined' ? window.location.href : ''}`,
      ariaLabel: 'Share on Google Plus'
    },
  ];

  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link href="/" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-500 mb-4">Blog Not Found</h1>
        <Link href="/" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Header Section */}
      <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
        <div className='flex justify-between items-center'>
          <Link href='/' className="hover:opacity-80 transition-opacity">
            <Image 
              src={assets.logo} 
              width={180} 
              alt='Blog Logo' 
              className='w-[130px] sm:w-auto' 
              priority
            />
          </Link>
          <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000] hover:shadow-[-5px_5px_0px_#000000] transition-all duration-200'>
            Get started 
            <Image src={assets.arrow} alt='Arrow icon' width={16} height={16} />
          </button>
        </div>
        
        {/* Blog Header */}
        <div className='text-center my-24'>
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto leading-tight mb-6'>
            {blog.title}
          </h1>
          
          <div className="flex flex-col items-center gap-4">
            <Image 
              className='rounded-full border-4 border-white shadow-lg' 
              src={'assets.profile_icon'} 
              width={60} 
              height={60} 
              alt={`${blog.author} profile picture`}
            />
            <div className="text-center">
              <p className='text-lg font-medium text-gray-800'>{blog.author}</p>
              <p className='text-sm text-gray-600'>{formatDate(blog.date)}</p>
              <span className='inline-block mt-2 px-3 py-1 bg-black text-white text-sm rounded-full'>
                {blog.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
        <Image 
          className='border-4 border-white shadow-xl rounded-lg w-full' 
          src={blog.image} 
          width={800} 
          height={480} 
          alt={blog.title}
          priority
        />
        
        <article className='prose prose-lg max-w-none mt-8'>
          <div 
            className='blog-content leading-relaxed text-gray-800'
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </article>

        {/* Social Share Section */}
        <div className='my-24 p-6 bg-gray-50 rounded-lg'>
          <h3 className='text-black font-semibold text-lg mb-4'>
            Share this article
          </h3>
          <div className='flex gap-3'>
            {socialShareLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-200"
                aria-label={social.ariaLabel}
              >
                <Image 
                  src={social.icon} 
                  width={44} 
                  height={44} 
                  alt={`${social.name} icon`}
                  className="hover:scale-110 transition-transform duration-200"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            ← Back to All Blogs
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BlogDetailPage;
