import express from 'express'
import OrderController from './orders.controller.js'

const orderRouter = express.Router()
const orderController = new OrderController()

orderRouter.get('/', (req,res,next) => {
    orderController.getOrder(req,res,next)
})
orderRouter.post('/', (req,res,next) => {
    orderController.placeOrder(req,res,next)
})


export default orderRouter