# 📖 BlogIt - Modern Blog Platform

A full-stack blog application built with Next.js 15, React 18, MongoDB, and Tailwind CSS. BlogIt features a modern admin panel for content management and email subscription system.

## ✨ Features

- **Modern Tech Stack**: Next.js 15, React 18, MongoDB, Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Admin Dashboard**: Complete blog management system
- **Email Subscriptions**: Newsletter subscription with CSV export
- **Image Upload**: File handling for blog thumbnails
- **Category Filtering**: Filter blogs by Technology, Startup, Lifestyle
- **SEO Friendly**: Optimized for search engines
- **Performance Optimized**: Image optimization and lazy loading

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your MongoDB URI:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-app
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
blog-app/
├── app/                    # Next.js 13+ app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── blogs/             # Blog detail pages
│   └── globals.css        # Global styles
├── Components/            # React components
│   └── AdminComponents/   # Admin-specific components
├── lib/                   # Database configuration and models
│   ├── config/           # Database connection
│   └── models/           # MongoDB schemas
├── Assets/               # Static assets and images
└── public/              # Public files
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## 📋 API Endpoints

### Blog API (`/api/blog`)
- `GET` - Fetch all blogs or specific blog by ID
- `POST` - Create new blog (with image upload)
- `DELETE` - Delete blog by ID

### Email API (`/api/email`)
- `GET` - Fetch all email subscriptions
- `POST` - Subscribe new email
- `DELETE` - Delete email subscription

## 🎨 Admin Panel

Access the admin panel at `/admin` to:

- 📝 **Create & Edit Blogs** - Rich text editor with image upload
- 📊 **Dashboard** - View statistics and recent activity
- 📋 **Manage Blogs** - List, edit, and delete existing blogs
- 📧 **Email Subscriptions** - Manage subscribers and export data

## 🔧 Technologies Used

- **Frontend**: Next.js 15, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **File Upload**: Next.js built-in file handling
- **Styling**: Tailwind CSS with custom components
- **Icons**: SVG icons and custom assets
- **Notifications**: React Toastify

## 🚀 Deployment

### Prerequisites for Deployment

1. **MongoDB Database**: Set up a MongoDB Atlas cluster or local MongoDB instance
2. **Environment Variables**: Configure production environment variables
3. **Node.js**: Ensure Node.js 18+ is available on your deployment platform

### Environment Setup for Production

1. **Create production environment file**:
   ```bash
   cp .env.production.example .env.local
   ```

2. **Configure environment variables**:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-app
   NODE_ENV=production
   ```

### Deployment Options

#### Option 1: Vercel (Recommended - Zero Configuration)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy automatically

3. **Environment Variables in Vercel**:
   ```
   MONGODB_URI = your_mongodb_connection_string
   NODE_ENV = production
   ```

#### Option 2: Netlify

1. **Build command**: `npm run build`
2. **Publish directory**: `.next`
3. **Add environment variables** in Netlify dashboard

#### Option 3: DigitalOcean/AWS/VPS

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build the application**:
   ```bash
   npm run build
   ```

3. **Start production server**:
   ```bash
   npm run start
   ```

4. **Use PM2 for process management** (optional):
   ```bash
   npm install -g pm2
   pm2 start npm --name "blog-app" -- start
   ```

#### Option 4: Docker Deployment

1. **Create Dockerfile**:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and run**:
   ```bash
   docker build -t blog-app .
   docker run -p 3000:3000 -e MONGODB_URI=your_uri blog-app
   ```

### Pre-Deployment Checklist

- [ ] ✅ **Build passes**: `npm run build` completes successfully
- [ ] ✅ **Linting passes**: `npm run lint` shows no errors
- [ ] ✅ **Environment variables set**: MongoDB URI configured
- [ ] ✅ **Database connection**: MongoDB Atlas or local DB accessible
- [ ] ✅ **Images optimized**: All assets properly configured
- [ ] ✅ **Routes tested**: All pages and API endpoints work
- [ ] ✅ **Mobile responsive**: Tested on various screen sizes

### Production Performance

- **Bundle Size**: ~101kB (optimized)
- **First Load JS**: ~142kB for main page
- **Static Generation**: Pre-rendered pages for better SEO
- **Image Optimization**: Automatic Next.js image optimization
- **Code Splitting**: Automatic for optimal loading

### Post-Deployment Testing

1. **Test all functionality**:
   - [ ] Homepage loads correctly
   - [ ] Blog creation works
   - [ ] Email subscription functions
   - [ ] Admin panel accessible
   - [ ] Image uploads work
   - [ ] Database operations complete

2. **Performance monitoring**:
   - Check loading speeds
   - Monitor database queries
   - Verify mobile responsiveness

### Troubleshooting Deployment Issues

**Common Issues**:

1. **Database Connection Error**:
   - Verify MONGODB_URI is correct
   - Check network access in MongoDB Atlas
   - Ensure IP whitelist includes deployment server

2. **Build Failures**:
   - Run `npm run lint` locally
   - Check all imports are correct
   - Verify all dependencies are installed

3. **Image Upload Issues**:
   - Ensure write permissions for /public directory
   - Check file size limits on hosting platform
   - Verify file path configurations

4. **Performance Issues**:
   - Enable gzip compression
   - Use CDN for static assets
   - Optimize database queries

## 🔒 Environment Variables

Create `.env.local` file with:

```env
# Required
MONGODB_URI=your_mongodb_connection_string

# Optional
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the console for error messages
2. Ensure MongoDB is connected
3. Verify environment variables are set correctly
4. Check if all dependencies are installed

## 📈 Performance Features

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting for better performance
- **Lazy Loading**: Components and images load on demand
- **Caching**: Efficient caching strategies
- **SEO Optimization**: Meta tags and structured data

---

Built with ❤️ using modern web technologies
