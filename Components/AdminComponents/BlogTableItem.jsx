import { assets } from '@/Assets/assets';
import Image from 'next/image';
import React from 'react';

const BlogTableItem = ({ authorImg, title, author, category, date, deleteBlog, mongoId }) => {
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const truncateTitle = (text, maxLength = 50) => {
    if (!text) return 'No title';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const handleDelete = () => {
    deleteBlog(mongoId);
  };

  return (
    <tr className='bg-white border-b hover:bg-gray-50 transition-colors'>
      <td className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900'>
        <Image 
          width={40} 
          height={40} 
          src={authorImg || assets.profile_icon} 
          alt={author || 'Author'}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{author || "No author"}</p>
        </div>
      </td>
      
      <td className='px-6 py-4'>
        <div>
          <p className="font-medium text-gray-900" title={title}>
            {truncateTitle(title)}
          </p>
        </div>
      </td>
      
      <td className='px-6 py-4'>
        <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
          {category || 'Uncategorized'}
        </span>
      </td>
      
      <td className='px-6 py-4 text-gray-600'>
        {formatDate(date)}
      </td>
      
      <td className='px-6 py-4'>
        <button 
          onClick={handleDelete}
          className='text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-full transition-colors duration-200'
          title="Delete blog"
          aria-label={`Delete blog: ${title}`}
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default BlogTableItem;
