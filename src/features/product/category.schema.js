import {Schema} from 'mongoose'

const categorySchema = new Schema({
    name: {
        type: String
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'product'
        }
    ]
})

export default categorySchema