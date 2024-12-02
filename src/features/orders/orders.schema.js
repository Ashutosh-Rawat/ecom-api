import mongoose,{schema} from 'mongoose'

const orderSchema = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    totalAmount: Number,
    timeStamp: String,
})

export default orderSchema