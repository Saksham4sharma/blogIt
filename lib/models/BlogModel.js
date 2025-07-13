import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Blog description is required'],
        minlength: [50, 'Description must be at least 50 characters']
    },
    category: {
        type: String,
        required: [true, 'Blog category is required'],
        enum: ['Technology', 'Startup', 'Lifestyle'],
        default: 'Technology'
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true,
        maxlength: [100, 'Author name cannot exceed 100 characters']
    },
    image: {
        type: String,
        required: [true, 'Blog image is required']
    },
    authorImg: {
        type: String,
        required: [true, 'Author image is required'],
        default: '/author_img.png'
    },
    date: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        unique: true,
        sparse: true
    },
    published: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Create slug from title before saving
blogSchema.pre('save', function(next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9 ]/g, '')
            .replace(/\s+/g, '-')
            .substring(0, 50);
    }
    next();
});

// Virtual for formatted date
blogSchema.virtual('formattedDate').get(function() {
    return this.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Static method to find published blogs
blogSchema.statics.findPublished = function() {
    return this.find({ published: true }).sort({ date: -1 });
};

const BlogModel = mongoose.models.blog || mongoose.model('blog', blogSchema);

export default BlogModel;