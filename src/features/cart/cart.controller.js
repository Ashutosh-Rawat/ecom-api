import { ApplicationError } from "../../middlewares/applicationError.middleware.js"
import CartModel from "./cart.model.js"
import CartRepository from "./cart.repository.js"
import UserRepository from "../user/user.repository.js"
import ProductRepository from "../product/product.repository.js"
import { ObjectId } from "mongodb"

export default class CartController {
    constructor() {
        this.cartRepository = new CartRepository()
    }
    async getCartItems(req, res, next) {
        try {
            const cartItems = await this.cartRepository.items(req.userId)
            return res.status(200).send(cartItems)
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
    async postAddItem(req, res, next) {
        try {
            // Validate user
            const userId = req.userId
            const userRepository = new UserRepository()
            await userRepository.getUser(userId)

            // Validate product
            const { productId, quantity } = req.query
            const productRepository = new ProductRepository()
            await productRepository.get(productId)

            // Validate quantity
            if (isNaN(parseFloat(quantity)) || parseFloat(quantity) == 0) {
                throw new ApplicationError('invalid quantity', 400)
            }

            // Add after validations
            const cartItem = new CartModel(userId, productId, quantity)
            await this.cartRepository.add(cartItem)
            res.status(201).send(`Product ${productId} added to cart`)
        } catch (err) {
            console.log(err)
            if (err instanceof ApplicationError) next(err)
            else next(new ApplicationError('Error occurred while adding item to cart', 400))
        }
    }
    async deleteItem(req, res, next) {
        try {
            const userId = req.userId
            const productId = req.query.productId
            await this.cartRepository.delete(userId, productId)
            res.status(200).send(`product ${productId} deleted from cart`)
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
    async getBill(req, res, next) {
        try {
            let totalPrice = 0
            const cartItems = await this.cartRepository.items(req.userId)
            const productRepository = new ProductRepository()
            for (const item of cartItems) {
                if (item.userId.equals(new ObjectId(req.userId))) {
                    const product = await productRepository.get(item.productId.toString())
                    totalPrice += product.productPrice
                }
            }
            res.status(200).send(`Bill: ₹${totalPrice}`)
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}
