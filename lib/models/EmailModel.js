import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please provide a valid email address'
        ]
    },
    date: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    source: {
        type: String,
        default: 'website',
        enum: ['website', 'admin', 'import']
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for formatted date
emailSchema.virtual('formattedDate').get(function() {
    return this.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Static method to find active subscriptions
emailSchema.statics.findActive = function() {
    return this.find({ isActive: true }).sort({ date: -1 });
};

// Instance method to deactivate subscription
emailSchema.methods.deactivate = function() {
    this.isActive = false;
    return this.save();
};

const EmailModel = mongoose.models.email || mongoose.model('email', emailSchema);

export default EmailModel;