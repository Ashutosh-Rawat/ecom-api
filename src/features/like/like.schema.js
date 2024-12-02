import { Schema } from 'mongoose'

const likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    likeable: {
        type: Schema.Types.ObjectId,
        refPath: 'dbtype'
    },
    dbtype: {
        type: String,
        enum: ['products', 'categories']
    }
}).pre('save', ()=> {
    console.log('new like coming in')
})

export default likeSchema
