import express from 'express'
import CartController from "./cart.controller.js"

const cartRouter = express.Router()
const cartController = new CartController()
cartRouter.get('/', (req,res,next) => {
    cartController.getCartItems(req,res,next)
})
cartRouter.post('/', (req,res,next) => {
    cartController.postAddItem(req,res,next)
})
cartRouter.delete('/', (req,res,next) => {
    cartController.deleteItem(req,res,next)
})
cartRouter.get('/checkout', (req,res,next) => {
    cartController.getBill(req,res,next)
})


export default cartRouter