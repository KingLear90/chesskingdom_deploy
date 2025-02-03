import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        unique: true,
        maxlength: 50,
        minlength: 3,
        trim: true,
        lowercase: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model('category', categorySchema);