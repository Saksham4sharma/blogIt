'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalSubscriptions: 0,
    recentBlogs: [],
    recentSubscriptions: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogsResponse, emailsResponse] = await Promise.all([
          axios.get('/api/blog'),
          axios.get('/api/email')
        ]);

        const blogs = blogsResponse.data.blogs || [];
        const emails = emailsResponse.data.emails || [];

        setStats({
          totalBlogs: blogs.length,
          totalSubscriptions: emails.length,
          recentBlogs: blogs.slice(0, 5),
          recentSubscriptions: emails.slice(0, 5)
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your blog management dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Total Blogs</h3>
          <p className="text-3xl font-bold">{stats.totalBlogs}</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Email Subscribers</h3>
          <p className="text-3xl font-bold">{stats.totalSubscriptions}</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Engagement Rate</h3>
          <p className="text-3xl font-bold">
            {stats.totalBlogs > 0 ? Math.round((stats.totalSubscriptions / stats.totalBlogs) * 10) : 0}%
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link 
          href="/admin/addBlog"
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Create New Blog</h3>
          <p className="text-gray-600 mb-4">Write and publish a new blog post</p>
          <div className="text-blue-600 font-medium">Add Blog →</div>
        </Link>
        
        <Link 
          href="/admin/blogList"
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Manage Blogs</h3>
          <p className="text-gray-600 mb-4">Edit or delete existing blog posts</p>
          <div className="text-blue-600 font-medium">View Blogs →</div>
        </Link>
        
        <Link 
          href="/admin/subscriptions"
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Email List</h3>
          <p className="text-gray-600 mb-4">Manage email subscribers</p>
          <div className="text-blue-600 font-medium">View Subscribers →</div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Blogs */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Blogs</h3>
          {stats.recentBlogs.length > 0 ? (
            <div className="space-y-3">
              {stats.recentBlogs.map((blog) => (
                <div key={blog._id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-800 truncate max-w-[200px]">{blog.title}</p>
                    <p className="text-sm text-gray-500">{blog.category}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(blog.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No blogs yet</p>
          )}
        </div>

        {/* Recent Subscriptions */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Subscriptions</h3>
          {stats.recentSubscriptions.length > 0 ? (
            <div className="space-y-3">
              {stats.recentSubscriptions.map((subscription) => (
                <div key={subscription._id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <p className="font-medium text-gray-800 truncate max-w-[200px]">{subscription.email}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(subscription.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No subscriptions yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
