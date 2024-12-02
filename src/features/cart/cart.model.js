import { ObjectId } from "mongodb"

export default class CartModel {
    constructor (userId, productId, quantity) {
        this.userId = new ObjectId(userId)
        this.productId = new ObjectId(productId)
        this.quantity = parseFloat(quantity)
    }
}

