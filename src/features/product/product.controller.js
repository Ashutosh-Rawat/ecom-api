import { ApplicationError } from "../../middlewares/applicationError.middleware.js"
import ProductModel from "./product.model.js"
import ProductRepository from "./product.repository.js"
import UserRepository from "../user/user.repository.js"

export default class ProductController {
    constructor() {
        this.productRepository = new ProductRepository()
    }

    async getAllProducts(req, res, next) {
        try {
            const products = await this.productRepository.getAll()
            if(!products.length) throw new ApplicationError('products not found', 404)
            res.status(200).send(products)
        } catch(err) {
            next(err)
        }
    }

    async postAddProduct(req, res, next) {
        try {
            // const url = req.file.filename
            const productObj = new ProductModel(req.body)
            const newProduct = await this.productRepository.add(productObj)
            res.status(201).send(newProduct)
        } catch(err) {
            if(err instanceof ApplicationError) next(err)
            else throw new ApplicationError('error adding product', 400)
        }
    }

    async deleteProduct(req,res,next) {
        try {
            const productId = req.params.id
            await this.productRepository.delete(productId)
            res.status(200).send('product deleted successfully')
        } catch(err) {next(err)}
    }

    async rateProduct(req, res, next) { 
        try { 
            const userId = req.userId
            const productId = req.query.productId 
            const rating = req.query.rating 
            // Validate user 
            const userRepository = new UserRepository()
            await userRepository.getUser(userId)
            
            const parsedRating = parseFloat(rating) 
            // if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) { 
            //     throw new ApplicationError('Invalid rating', 400) 
            // } 
            await this.productRepository.rate(userId, productId, parsedRating) 
            return res.status(200).send('Rating received') 
        } catch (err) { 
            console.log(err)
            if (err instanceof ApplicationError) next(err) 
            else next(new ApplicationError('error rating product', 400)) 
        } 
    }

    async getOneProduct(req, res, next) {
        try {
            const id = req.params.id
            const product = await this.productRepository.get(id)
            if(!product) throw new ApplicationError('product not found', 404)
            return res.status(200).send(product)
        } catch(err) {
            next(err)
        }
    }

    async filterProducts(req,res, next) {
        try {
            const minPrice = req.query.minPrice
            const maxPrice = req.query.maxPrice
            const category = req.query.category
            let sizes = req.query.sizes
            sizes = Array.isArray(sizes) ? sizes : ( sizes ? 
                sizes.split(',').map(
                    size => size.trim().replace(/['"]+/g, '')
                ) : sizes
            )
            const products = await this.productRepository.filter(minPrice,maxPrice,category,sizes)
            if(!products.length) throw new ApplicationError('no products match with requirements', 404)
            return res.status(200).send(products)
        } catch(err) {
            next(err)
        }
    }

    async averagePrice(req,res,next) {
        try {
            const result = await this.productRepository.averagePricePerCategory()
            return res.status(200).send(result)
        } catch(err) {
            next(err)
        }
    }
}
