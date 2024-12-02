import { MongoClient } from "mongodb"
const url = process.env.DB_URL
let db
let client

export const getClient = () => client

const connectDB = async () => {
    if (db) return db // Return the existing connection if already connected

    try {
        client = await MongoClient.connect(url)
        db = client.db() // Initialize the database connection
        console.log('MongoDB is connected')
        return db
    } catch (error) {
        console.error('Failed to connect to MongoDB', error)
        throw error
    }
}

export const getDB = async () => {
    if (!db) {
        await connectDB() // Ensure the database is connected
    }
    return db
}

export default connectDB
