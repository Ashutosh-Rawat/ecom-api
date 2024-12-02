import { ObjectId } from "mongodb"
import { getDB } from "../../config/mongodb.js"
import { ApplicationError } from "../../middlewares/applicationError.middleware.js"

export default class CartRepository {
    static async cartCollection() {
        const db = await getDB()
        return db.collection('cart')
    }
    async find(userId, productId) {
        try {
            const collection = await CartRepository.cartCollection()
            const cartItem = await collection.findOne(
                { userId: new ObjectId(userId), productId: new ObjectId(productId) }
            )
            return cartItem
        } catch (err) {
            throw new ApplicationError('database error', 500)
        }
    }
    async items(userId) {
        try {
            const collection = await CartRepository.cartCollection()
            const items = await collection.find(
                { userId: new ObjectId(userId) }
            ).toArray()
            if (!items.length) throw new ApplicationError('user cart is empty', 404)
            return items
        } catch (err) {
            if (err instanceof ApplicationError) throw err
            else throw new ApplicationError('database error', 500)
        }
    }
    async add(cartItem) {
        try {
            const collection = await CartRepository.cartCollection()
            const res = await collection.findOneAndUpdate(
                {userId: cartItem.userId, productId: cartItem.productId},
                {$inc: {quantity: cartItem.quantity}},
                {upsert: true}
            )
            const addedItem = await collection.findOne({ _id: res._id })
            console.log(`user ${cartItem.userId.toString()} added item to cart: `)
            console.log(addedItem)
        } catch (err) {
            console.log(err)
            throw new ApplicationError('database error', 500)
        }
    }
    async delete(userId, productId) {
        try {
            const collection = await CartRepository.cartCollection()
            const res = await collection.findOneAndDelete(
                { userId: new ObjectId(userId), productId: new ObjectId(productId) }
            )
            if (res.deletedCount === 0) throw new ApplicationError('cart item not found', 404)
            console.log(`user ${userId} has deleted product from cart: `)
            console.log(res)
        } catch (err) {
            console.log(err)
            if (err instanceof ApplicationError) throw err
            else throw new ApplicationError('database error', 500)
        }
    }
}
