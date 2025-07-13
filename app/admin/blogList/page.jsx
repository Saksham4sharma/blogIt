'use client'
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';

const BlogListPage = () => {
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

  const deleteBlog = useCallback(async (mongoId) => {
    if (!window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await axios.delete('/api/blog', {
        params: { id: mongoId }
      });
      
      if (response.data.success) {
        toast.success(response.data.message || 'Blog deleted successfully');
        // Remove the deleted blog from state instead of refetching all
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== mongoId));
      } else {
        toast.error(response.data.message || 'Failed to delete blog');
      }
    } catch (error) {
      console.error("Failed to delete blog:", error);
      
      if (error.response?.status === 404) {
        toast.error('Blog not found');
      } else {
        toast.error('Failed to delete blog. Please try again.');
      }
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  if (loading) {
    return (
      <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={fetchBlogs}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Blogs</h1>
        <div className="text-sm text-gray-600">
          Total: {blogs.length} {blogs.length === 1 ? 'blog' : 'blogs'}
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">No blogs found</p>
          <a 
            href="/admin/addBlog" 
            className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Add Your First Blog
          </a>
        </div>
      ) : (
        <div className="relative h-[80vh] max-w-[900px] overflow-x-auto border border-gray-400 rounded-lg shadow-sm">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-700 text-left uppercase bg-gray-50 sticky top-0">
              <tr>
                <th scope="col" className="hidden sm:table-cell px-6 py-4 font-medium">
                  Author
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Blog Title
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Category
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Date
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <BlogTableItem 
                  key={blog._id}
                  mongoId={blog._id} 
                  title={blog.title} 
                  author={blog.author} 
                  authorImg={blog.authorImg} 
                  category={blog.category}
                  date={blog.date} 
                  deleteBlog={deleteBlog}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BlogListPage;
