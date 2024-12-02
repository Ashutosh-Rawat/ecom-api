import { ObjectId } from "mongodb"
import { getDB } from "../../config/mongodb.js"
import { ApplicationError } from "../../middlewares/applicationError.middleware.js"

class UserRepository {
    static async userCollection() {
        const db = await getDB()
        return db.collection('users')
    }

    async addUser(newUser) {
        try {
            const collection = await UserRepository.userCollection()
            const res = await collection.insertOne(newUser)
            const userData = await collection.findOne({_id:res.insertedId})
            console.log('user added: ')
            console.log(userData)
            return res.insertedId.toString()
        } catch(err) {
            console.log(err)
            throw new ApplicationError('database error', 500)
        }
    }
    async findByEmail(email) {
        try {
            const collection = await UserRepository.userCollection()
            const user = await collection.findOne({email})
            user._id = user._id.toString()
            return user
        } catch(err) {
            throw new ApplicationError('database error', 500)
        }
    }

    async getAll() {
        const collection = await UserRepository.userCollection()
        const users = await collection.find().toArray() // Convert cursor to array
        return users
    }

    async getUser(userId) {
        const collection = await UserRepository.userCollection()
        const user = await collection.findOne({ _id: new ObjectId(userId) }) // Use findOne and convert id to ObjectId
        if (!user) throw new ApplicationError('User not found', 404)
        return user
    }
}


export default UserRepository
