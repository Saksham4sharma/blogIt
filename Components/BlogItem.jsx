import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogItem = ({ title, description, category, image, id, author, date }) => {
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  const truncateDescription = (text, maxLength = 120) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <article className='max-w-[330px] bg-white border border-black transition-all hover:shadow-[-7px_7px_0px_#000000] hover:-translate-y-1 duration-300 animate-fade-in'>
      <Link href={`/blogs/${id}`} className="block">
        <div className="relative overflow-hidden">
          <Image 
            src={image} 
            alt={title || 'Blog post image'} 
            width={400} 
            height={250} 
            className='w-full h-[200px] object-cover border-b border-black hover:scale-105 transition-transform duration-300' 
            loading="lazy"
          />
          <div className="absolute top-4 left-4">
            <span className='px-3 py-1 bg-black text-white text-xs font-medium rounded-full'>
              {category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          {author && <span>By {author}</span>}
          {date && <span>{formatDate(date)}</span>}
        </div>
        
        <h3 className='mb-3 text-lg font-semibold tracking-tight text-gray-900 line-clamp-2 hover:text-gray-700 transition-colors'>
          <Link href={`/blogs/${id}`}>
            {title || 'Untitled'}
          </Link>
        </h3>
        
        <p 
          className='mb-4 text-sm tracking-tight text-gray-600 line-clamp-3' 
          dangerouslySetInnerHTML={{
            __html: truncateDescription(description?.replace(/<[^>]*>/g, '') || '')
          }}
        />
        
        <Link 
          href={`/blogs/${id}`} 
          className='inline-flex items-center text-sm font-semibold text-black hover:text-gray-700 transition-colors group'
          aria-label={`Read more about ${title}`}
        >
          Read more 
          <Image 
            src={assets.arrow} 
            className='ml-2 transition-transform group-hover:translate-x-1' 
            alt='' 
            width={12} 
            height={12}
          />
        </Link>
      </div>
    </article>
  );
};

export default BlogItem;
