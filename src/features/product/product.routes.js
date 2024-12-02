import express from 'express'
import ProductController from './product.controller.js'
import uploadFile from '../../middlewares/fileupload.middleware.js'

const productRouter = express.Router()
const productController = new ProductController()

productRouter.get('/', (req,res,next) => {
    productController.getAllProducts(req,res,next)
})
productRouter.post('/', 
    // uploadFile.single('imgUrl'),
    // uploadFile.array('imgUrl'),
    // .array is the upload multiple files
    (req,res,next) => {
        productController.postAddProduct(req,res,next)
    }
)
// api url structure
// localhost:3100/api/products/filter?minPrice=x&&maxPrice=y&&category=z&&sizes=m
productRouter.get('/filter', (req,res,next) => {
    productController.filterProducts(req,res,next)
})

productRouter.get('/avg', (req,res,next) => {
    productController.averagePrice(req,res,next)
})

productRouter.get('/:id', (req,res,next) => {
    productController.getOneProduct(req,res,next)
})

productRouter.delete('/:id', (req,res,next) => {
    productController.deleteProduct(req,res,next)
})

productRouter.post('/rate', (req,res,next) => {
    productController.rateProduct(req,res,next)
})



export default productRouter