import {Schema} from 'mongoose'

const userSchema = new Schema({
    name: String,
    email: {
        type: String, 
        unique: true,
        required: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
        validate: {
            validator: function(value) {
                return /[a-zA-Z]/.test(value) && /[0-9]/.test(value)
            },
            message: 'password must be a combination of alphabets and numbers'
        }
    },
    type: {
        type: String, 
        enum: ['customer', 'seller']
    }
})

export default userSchema