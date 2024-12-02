import { ObjectId } from "mongodb"
import { getDB,getClient } from "../../config/mongodb.js"
import CartRepository from "../cart/cart.repository.js"
import { ApplicationError } from "../../middlewares/applicationError.middleware.js"
import OrderModel from "./orders.model.js"
import ProductRepository from "../product/product.repository.js"

export default class OrderRepository {
    static async orderCollection() {
        const db = await getDB()
        return db.collection('orders')
    }

    async placeOrder(userId) {
        // 0. get client
        const client = getClient()
        const session = client.startSession()
        try {
            session.startTransaction()
            // 1. get cart items and calculate total amount
            const items = await this.getTotalAmount(userId, session)
            const totalCost = items.reduce(
                (acc, item) => acc + item.totalAmount, 0
            )
            // 2. create an order record
            const newOrder = new OrderModel(userId, totalCost, new Date().toString())
            const collection = await OrderRepository.orderCollection()
            await collection.insertOne(newOrder, {session})
            // 3. reduce the stock
            for (let item of items) {
                const productCollection = await ProductRepository.productCollection()
                await productCollection.updateOne(
                    { _id: new ObjectId(item.productId) },
                    { $inc: { stock: -item.quantity } },
                    {session}
                )
            }
            // 4. clear the cart items
            const cartCollection = await CartRepository.cartCollection()
            await cartCollection.deleteMany(
                { userId: new ObjectId(userId) },
                {session}
            )

            session.commitTransaction()
            session.endSession()
        } catch (err) {
            console.log(err)
            throw new ApplicationError('database error', 500)
        }
    }

    async getTotalAmount(userId, session) {
        try {
            const collection = await CartRepository.cartCollection()
            const orderCosts = await collection.aggregate([
                // 1. get cart items for the user
                { $match: { userId: new ObjectId(userId) } },
                // 2. find the price of product for each product id
                {
                    $lookup: {
                        from: "products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "productInfo"
                    }
                },
                // 3. unwinding the productInfo
                { $unwind: "$productInfo" },
                // 4. calculate totalAmount for each cart item
                {
                    $addFields: {
                        "totalAmount": {
                            $multiply: ["$productInfo.productPrice", "$quantity"]
                        }
                    }
                }

            ], {session}).toArray()
            return orderCosts
        } catch (err) {
            console.log(err)
            throw new ApplicationError('database error', 500)
        }
    }
}
