import mongoose from 'mongoose'
import dotenv from 'dotenv'
import categorySchema from '../features/product/category.schema.js'

dotenv.config()
const url = process.env.DB_URL

const connectMongoose = async() => {
    try {
        await mongoose.connect(url)
        await addCategories()
        console.log('mongoose is connected')
    } catch(err) {
        console.log(err)
    }
}

const addCategories = async() => {
    const CategoryModel = mongoose.model('categories', categorySchema)
    const categories = await CategoryModel.find()
    if(!categories || !categories.length) {
        await CategoryModel.insertMany([
            {name: 'Books'},
            {name: 'Clothing'},
            {name: 'Bags'},
            {name: 'Electronics'}
        ])
        console.log('categories added')
    }
}
export default connectMongoose