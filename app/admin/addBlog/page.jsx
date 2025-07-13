'use client'
import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

const CATEGORIES = ['Startup', 'Technology', 'Lifestyle'];

const AddBlogPage = () => {
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bennett",
    authorImg: "/author_img.png"
  });

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      setImage(file);
    }
  }, []);

  const resetForm = useCallback(() => {
    setImage(null);
    setFormData({
      title: "",
      description: "",
      category: "Startup",
      author: "Alex Bennett",
      authorImg: "/author_img.png"
    });
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    if (!image) {
      toast.error('Please select an image');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      submitData.append('image', image);
      
      const response = await axios.post('/api/blog', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        toast.success(response.data.message || "Blog added successfully!");
        resetForm();
      } else {
        toast.error(response.data.message || "Failed to add blog");
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      
      if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid blog data");
      } else {
        toast.error("Failed to add blog. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, image, isSubmitting, resetForm]);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <div className="max-w-[600px]">
        <h1 className="text-2xl font-bold mb-8">Add New Blog</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-lg font-medium mb-4">Upload Thumbnail</label>
            <label htmlFor="image" className="cursor-pointer block">
              <Image 
                className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors rounded-lg"
                src={!image ? assets.upload_area : URL.createObjectURL(image)} 
                width={140} 
                height={70} 
                alt="Upload area"
              />
            </label>
            <input 
              onChange={handleImageChange} 
              type="file" 
              id="image" 
              accept="image/*"
              className="hidden" 
              required 
              disabled={isSubmitting}
            />
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: JPG, PNG, WebP (Max 5MB)
            </p>
          </div>

          {/* Blog Title */}
          <div>
            <label className="block text-lg font-medium mb-2">Blog Title</label>
            <input 
              name="title" 
              onChange={handleInputChange} 
              value={formData.title} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
              type="text" 
              placeholder="Enter blog title" 
              required 
              disabled={isSubmitting}
              maxLength={200}
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.title.length}/200 characters
            </p>
          </div>

          {/* Blog Description */}
          <div>
            <label className="block text-lg font-medium mb-2">Blog Description</label>
            <textarea 
              name="description" 
              onChange={handleInputChange} 
              value={formData.description} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-vertical" 
              placeholder="Write your blog content here..." 
              rows={8} 
              required 
              disabled={isSubmitting}
              minLength={50}
            />
            <p className="text-sm text-gray-500 mt-1">
              Minimum 50 characters required. You can use HTML tags for formatting.
            </p>
          </div>

          {/* Category and Author Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Blog Category */}
            <div>
              <label className="block text-lg font-medium mb-2">Blog Category</label>
              <select 
                name="category" 
                onChange={handleInputChange} 
                value={formData.category} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-700"
                disabled={isSubmitting}
              >
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Author Name */}
            <div>
              <label className="block text-lg font-medium mb-2">Author Name</label>
              <input 
                name="author" 
                onChange={handleInputChange} 
                value={formData.author} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
                type="text" 
                placeholder="Author name" 
                required 
                disabled={isSubmitting}
                maxLength={100}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full md:w-auto min-w-[200px] px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding Blog...' : 'Add Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPage;
