import mongoose,{schema} from 'mongoose'

const cartSchema = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    productId: {type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    quantity: Number
})

export default cartSchema