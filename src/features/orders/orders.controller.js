import OrderModel from "./orders.model.js"
import OrderRepository from "./orders.repository.js"

export default class OrderController {
    constructor() {
        this.orderRepository = new OrderRepository()
    }

    async getOrder(req,res,next) {
        try {
            const items = await this.orderRepository.getTotalAmount(req.userId)
            res.status(200).send(items)
        } catch(err) {
            next(err)
        }
    }
    async placeOrder(req,res,next) {
        try {
            const userId = req.userId
            await this.orderRepository.placeOrder(userId)
            // const itemAmount = await this.orderRepository.getTotalAmount(userId)
            
            res.status(201).send('order is created')
        } catch(err) {
            next(err)
        }
    }
}