import mongoose, { Schema } from 'mongoose'

const reviewSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: [true, 'Product reference is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'User reference is required']
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must be at most 5'],
        required: [true, 'Rating is required']
    }
})

export default reviewSchema
