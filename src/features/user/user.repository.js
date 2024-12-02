import mongoose from "mongoose"
import userSchema from "./user.schema.js"
import { ApplicationError } from "../../middlewares/applicationError.middleware.js"

// creating model from schema
const UserModel = mongoose.model('users', userSchema)

export default class UserRepository {
    async addUser(user) {
        try {
            // create instance of model
            const newUser = new UserModel(user)
            await newUser.save()
            return newUser._id.toString()
        } catch(err) {
            console.log(err)
            if(err instanceof mongoose.Error.ValidationError) throw err
            else throw new ApplicationError('database error', 500)
        }
    }

    async findByEmail(email) {
        try {
            return await UserModel.findOne({email})
        } catch(err) {
            console.log(err)
            throw new ApplicationError('database error', 500)
        }
    }

    async getAll() {
        try {
            return await UserModel.find().toArray()
        } catch(err) {
            console.log(err)
            throw new ApplicationError('database error', 500)
        }
    }

    async getUser(userId) {
        try {
            const user = await UserModel.findById(userId)
            if(!user) throw new ApplicationError('User not found', 404)
            return user
        } catch(err) {
            console.log(err)
            if(err instanceof ApplicationError) throw err
            else throw new ApplicationError('database error', 500)
        }
    }

    async resetPassword(userId,newPassword) {
        try {
            const user = await UserModel.findById(userId)
            if(!user) throw new ApplicationError('user not found', 404)
            user.password = newPassword
            user.save()
        } catch(err) {
            console.log(err)
            throw new ApplicationError('database error', 500)
        }
    }
}
