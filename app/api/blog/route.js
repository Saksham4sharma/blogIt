import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// API Endpoint to get all blogs or a specific blog
export async function GET(request) {
  try {
    // Ensure database connection
    await ConnectDB();
    
    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("id");
    
    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      if (!blog) {
        return NextResponse.json(
          { success: false, message: "Blog not found" }, 
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, blog });
    } else {
      const blogs = await BlogModel.find({}).sort({ date: -1 });
      return NextResponse.json({ success: true, blogs });
    }
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blogs" }, 
      { status: 500 }
    );
  }
}

// API Endpoint For Uploading Blogs
export async function POST(request) {
  try {
    // Ensure database connection
    await ConnectDB();
    
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image');
    
    if (!image || !image.name) {
      return NextResponse.json(
        { success: false, message: "No image provided" }, 
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'blogit-uploads',
          public_id: `blog_${timestamp}_${image.name.split('.')[0]}`,
          resource_type: 'auto'
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const imgUrl = uploadResponse.secure_url;

    const blogData = {
      title: formData.get('title')?.toString() || '',
      description: formData.get('description')?.toString() || '',
      category: formData.get('category')?.toString() || '',
      author: formData.get('author')?.toString() || '',
      image: imgUrl,
      authorImg: formData.get('authorImg')?.toString() || ''
    };

    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'author'];
    const missingFields = requiredFields.filter(field => !blogData[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing required fields: ${missingFields.join(', ')}` }, 
        { status: 400 }
      );
    }

    const newBlog = await BlogModel.create(blogData);
    console.log("Blog saved successfully:", newBlog._id);

    return NextResponse.json({ success: true, message: "Blog added successfully", blogId: newBlog._id });
  } catch (error) {
    console.error("POST /api/blog error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create blog" }, 
      { status: 500 }
    );
  }
}

// API Endpoint to delete Blog
export async function DELETE(request) {
  try {
    // Ensure database connection
    await ConnectDB();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Blog ID is required" }, 
        { status: 400 }
      );
    }

    const blog = await BlogModel.findById(id);
    
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" }, 
        { status: 404 }
      );
    }

    // Delete the image from Cloudinary
    if (blog.image) {
      try {
        // Extract public_id from Cloudinary URL
        const publicId = blog.image.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.warn("Failed to delete image from Cloudinary:", error.message);
      }
    }

    await BlogModel.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/blog error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete blog" }, 
      { status: 500 }
    );
  }
}