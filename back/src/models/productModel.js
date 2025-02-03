import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product name is required"],
        unique: true, 
        maxlength: 70,
        minlength: 2,
        trim: true,
        set: (value) => value.charAt(0).toUpperCase() + value.slice(1)
    },
    price : {
            type: Number,
            required: [true, "Price is required"],
            min: 100,
    },
    url: {
        type: String,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        maxlength: 200,
        minlength: 5,
        trim: true,
        set: (value) => value.charAt(0).toUpperCase() + value.slice(1)
    },
    category_id: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'category',
    },
})

export default mongoose.model('product', productSchema);