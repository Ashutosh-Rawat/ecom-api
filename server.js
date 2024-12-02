import './env.js'
import express, { response } from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import swagger from 'swagger-ui-express'
import cors from 'cors'

import productRouter from './src/features/product/product.routes.js'
import userRouter from './src/features/user/user.routes.js'
import cartRouter from './src/features/cart/cart.routes.js'
import orderRouter from './src/features/orders/orders.routes.js'
// import basicAuthorizer from './src/middlewares/basicAuth.middleware.js'
import jwtAuth from './src/middlewares/jwtAuth.middleware.js'
// import apiDocs from './swagger.json' assert {type: 'json'}
// the upper code is not fully supported as it is in deployment v3 so implement below code
const apiDocs = require('./swagger.json')
import loggingMiddleware from './src/middlewares/logger.middleware.js'
import applicationErrorHandler from './src/middlewares/applicationError.middleware.js'
// import connectDB from './src/config/mongodb.js'
import connectMongoose from './src/config/mongooseConfig.js'
import likeRouter from './src/features/like/like.routes.js'

const server = express()
// static folders
server.use(express.static(path.resolve('public')))

// server.use(urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cors())
server.use(loggingMiddleware)
server.use('/api/products', jwtAuth, productRouter)
server.use('/api/user', userRouter)
server.use('/api/cart', jwtAuth, cartRouter)
server.use('/api/orders', jwtAuth, orderRouter)
server.use('/api/likes', jwtAuth, likeRouter)
server.use('/api/docs', swagger.serve,swagger.setup(apiDocs))
// default page
server.get('/', (req,res) => {
    res.status(200).json({response: true, message: "welcome to e-com api"})
})

// 404 handling middleware
server.use((req,res) => {
    res.status(404).json({response: false, message: "invalid api route"})
})

// exception handling middleware and logging
server.use(applicationErrorHandler)

server.listen(3100, async() => {
    console.log('server starting listening on port 3100')
    // await connectDB()
    connectMongoose()
})