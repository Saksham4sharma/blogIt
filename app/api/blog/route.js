import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

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

    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const fileName = `${timestamp}_${image.name}`;
    const filePath = path.join(process.cwd(), 'public', fileName);
    
    await writeFile(filePath, buffer);
    const imgUrl = `/${fileName}`;

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

    // Delete the image file
    if (blog.image) {
      try {
        const imagePath = path.join(process.cwd(), 'public', blog.image);
        await unlink(imagePath);
      } catch (error) {
        console.warn("Failed to delete image file:", error.message);
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