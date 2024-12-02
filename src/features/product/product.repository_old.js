import { ApplicationError } from "../../middlewares/applicationError.middleware.js"
import { getDB } from "../../config/mongodb.js"
import { ObjectId } from "mongodb"


export default class ProductRepository {
    static async productCollection() {
        const db = await getDB()
        return db.collection('products')
    } 

    async getAll() {
        const collection = await ProductRepository.productCollection()
        const products = await collection.find().toArray()
        return products
    }

    async get(id) {
        const collection = await ProductRepository.productCollection()
        const product = await collection.findOne({_id: new ObjectId(id)})
        if(!product) throw new ApplicationError('product not found', 404)
        return product
    }

    async add(productObj) {
        try {
            const collection = await ProductRepository.productCollection()
            const res = await collection.insertOne(productObj)
            const product = await collection.findOne({_id: res.insertedId})
            console.log('product added: ')
            console.log(product)
            return product
        } catch(err) {
            throw new ApplicationError('database error', 500)
        }
    }

    async delete(id) {
        try {
            const collection = await ProductRepository.productCollection()
            const res = await collection.findOneAndDelete({_id: new ObjectId(id)})
            if(res.deletedCount==0) throw new ApplicationError('requested product not deleted', 400)
            console.log('product deleted: ')
            console.log(res)
        } catch(err) {
            if(err instanceof ApplicationError) throw err
            else throw new ApplicationError('database error', 500)
        }
    }

    async filter(minPrice, maxPrice, category, sizes) { 
        try { 
            const collection = await ProductRepository.productCollection() 
            const query = {} 
            if (minPrice) { 
                query.productPrice = { $gte: parseFloat(minPrice) } 
            }
            if (maxPrice) { 
                query.productPrice = query.productPrice || {} 
                query.productPrice.$lte = parseFloat(maxPrice) 
            } 
            if (category) {
                query.productCategory = category 
            } 
            if (sizes) { 
                query.productSizes = { $in: sizes } 
            } 
            const filteredProducts = await collection.find(query).toArray() 
            return filteredProducts 
        } catch (err) { 
            throw new ApplicationError('database error', 500) 
        } 
    }

    async rate(userId, productId, rating) { 
        try {
            const collection = await ProductRepository.productCollection()
            const product = await collection.findOne({_id: new ObjectId(productId)})
            if (!product) throw new ApplicationError('Product not found', 404)
            if (!product.ratings) {
                await collection.updateOne(
                    {_id: new ObjectId(productId)},
                    {$set: {ratings: []}}
                )
            }
            await collection.updateOne(
                {_id: new ObjectId(productId)},
                {$pull: {ratings: {userId: new ObjectId(userId)}}}
            )
            const res = await collection.updateOne(
                {_id: new ObjectId(productId)}, 
                {$push: {ratings: {userId: new ObjectId(userId), rating}}}
            )
            console.log('updated rating for product: ', productId)
        } catch(err) {
            console.log(err)
            if(err instanceof ApplicationError) throw err
            else throw new ApplicationError('database error', 500)
        }
    }    

    async averagePricePerCategory() {
        try {
            const collection = await ProductRepository.productCollection()
            const avgPricePerCategory = await collection.aggregate([
                {
                    $group: {
                        _id:"$productCategory", 
                        averagePrice: {$avg: "$productPrice"}
                    }
                }
            ]).toArray()
            return avgPricePerCategory
        } catch(err) {
            console.log(err)
            if(err instanceof ApplicationError) throw err
            else throw new ApplicationError('database error', 500)
        }
    }

    async averageRating() {
        try {
            const collection = await ProductRepository.productCollection()
            const productAvgRating = await collection.aggregate([
                {$unwind: "$ratings"},
                {
                    $group: {
                        _id:"$productName", 
                        "average rating": {$avg: "$ratings.rating"}
                    }
                }
            ]).toArray()
            return productAvgRating
        } catch(err) {
            console.log(err)
            if(err instanceof ApplicationError) throw err
            else throw new ApplicationError('database error', 500)
        }
    }
}