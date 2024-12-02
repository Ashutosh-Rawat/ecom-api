import {Schema} from 'mongoose'

const productSchema = new Schema({
    productName: { 
        type: String, 
        required: [true, 'Product name is required'] 
    },
    productDesc: { 
        type: String, 
        required: [true, 'Product description is required'] 
    },
    productImgUrl: { 
        type: String, 
        required: [true, 'Product image URL is required'] 
    },
    productCategory: { 
        type: String, 
        required: [true, 'Product category is required'] 
    },
    productPrice: { 
        type: Number, 
        required: [true, 'Product price is required'], 
        min: [1, 'Product price must be greater than zero'] 
    },
    productSizes: [{ 
        type: String, 
        enum: ['S', 'M', 'L', 'XL'], 
        required: [true, 'Product size is required'] 
    }],
    stock: { 
        type: Number, 
        required: [true, 'Stock is required'], 
        min: [0, 'Stock cannot be negative'] 
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'review'
        }
    ],
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'category'
        }
    ]
})

export default productSchema