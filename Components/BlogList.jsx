import React, { useEffect, useState, useCallback, useMemo } from 'react';
import BlogItem from './BlogItem';
import axios from 'axios';

const CATEGORIES = ['All', 'Technology', 'Startup', 'Lifestyle'];

const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/blog');
      
      if (response.data.success) {
        setBlogs(response.data.blogs || []);
      } else {
        throw new Error(response.data.message || 'Failed to fetch blogs');
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setError(error.message || 'Failed to load blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredBlogs = useMemo(() => {
    if (selectedCategory === "All") {
      return blogs;
    }
    return blogs.filter(blog => blog.category === selectedCategory);
  }, [blogs, selectedCategory]);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button 
          onClick={fetchBlogs}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 md:px-12 lg:px-28">
      {/* Category Filter */}
      <div className='flex justify-center gap-6 my-10 flex-wrap'>
        {CATEGORIES.map((category) => (
          <button 
            key={category}
            onClick={() => handleCategoryChange(category)} 
            className={`py-2 px-4 rounded-sm transition-all duration-200 font-medium ${
              selectedCategory === category
                ? 'bg-black text-white shadow-lg' 
                : 'hover:bg-gray-100 border border-gray-300'
            }`}
            aria-label={`Filter by ${category}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Count */}
      <div className="text-center mb-8">
        <p className="text-gray-600">
          {filteredBlogs.length > 0 
            ? `Showing ${filteredBlogs.length} ${filteredBlogs.length === 1 ? 'blog' : 'blogs'}${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}`
            : 'No blogs found'
          }
        </p>
      </div>

      {/* Blog Grid */}
      {filteredBlogs.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-7xl mx-auto'>
          {filteredBlogs.map((blog) => (
            <BlogItem 
              key={blog._id} 
              id={blog._id} 
              image={blog.image} 
              title={blog.title} 
              description={blog.description} 
              category={blog.category}
              author={blog.author}
              date={blog.date}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            No blogs found in {selectedCategory === 'All' ? 'any category' : selectedCategory} category.
          </p>
          {selectedCategory !== 'All' && (
            <button 
              onClick={() => handleCategoryChange('All')}
              className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              View All Blogs
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogList;
