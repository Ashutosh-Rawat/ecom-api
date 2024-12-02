import mongoose from "mongoose"
import { ApplicationError } from "../../middlewares/applicationError.middleware.js"
import productSchema from "./product.schema.js"
import reviewSchema from "./review.schema.js"
import { ObjectId } from "mongodb"
import categorySchema from "./category.schema.js"

const ProductModel = mongoose.model('product', productSchema)
const ReviewModel = mongoose.model('review', reviewSchema)
const CategoryModel = mongoose.model('category', categorySchema)

export default class ProductRepository {
    async getAll() {
        const products = await ProductModel.find()
        return products
    }

    async get(id) {
        const product = await ProductModel.findById(id)
        if (!product) throw new ApplicationError('product not found', 404)
        return product
    }

    async add(productObj) {
        try {
            const product = new ProductModel(productObj)
            const newProduct = await product.save()
            // update categories
            await CategoryModel.updateMany(
                {_id: {$in: productObj.categories}},
                {
                    $push: {products: new ObjectId(newProduct._id)}
                }
            )
            console.log('product added: ')
            console.log(product)
            return product
        } catch (err) {
            console.log(err)
            if (err instanceof mongoose.Error.ValidationError) {
                throw new ApplicationError(err.message, 400)
            } else throw new ApplicationError('database error', 500)
        }
    }

    async delete(id) {
        try {
            const product = await ProductModel.findByIdAndDelete(id)
            if (!product) throw new ApplicationError('requested product not deleted', 400)
            console.log('product deleted: ')
            console.log(product)
        } catch (err) {
            if (err instanceof ApplicationError) throw err
            else throw new ApplicationError('database error', 500)
        }
    }

    async filter(minPrice, maxPrice, category, sizes) {
        try {
            const query = {}
            if (minPrice) {
                query.productPrice = { $gte: parseFloat(minPrice) }
            }
            if (maxPrice) {
                query.productPrice = query.productPrice || {}
                query.productPrice.$lte = parseFloat(maxPrice)
            }
            if (category) {
                query.productCategory = category
            }
            if (sizes) {
                query.productSizes = { $in: sizes }
            }
            const filteredProducts = await ProductModel.find(query)
            return filteredProducts
        } catch (err) {
            throw new ApplicationError('database error', 500)
        }
    }

    async rate(userId, productId, rating) {
        try {
            const product = await ProductModel.findById(productId)
            if (!product) throw new ApplicationError('Product not found', 404)

            if (!product.reviews) product.reviews = []
            // 1. get the existing review
            const userReview = await ReviewModel.findOne({
                product: new ObjectId(productId),
                user: new ObjectId(userId)
            })
            if (userReview) {
                userReview.rating = rating
                await userReview.save()
            } else {
                const newReview = new ReviewModel({
                    product: new ObjectId(productId),
                    user: new ObjectId(userId),
                    rating: rating
                })
                await newReview.save()

                product.reviews.push(newReview._id)
            }
            await product.save()
            console.log('updated rating for product: ', productId)
        } catch (err) {
            console.log(err)
            if (err instanceof ApplicationError) throw err
            else if (err instanceof mongoose.Error.ValidationError) {
                throw new ApplicationError(err.message, 400)
            } else throw new ApplicationError('database error', 500)
        }
    }

    async averagePricePerCategory() {
        try {
            const avgPricePerCategory = await ProductModel.aggregate([
                {
                    $group: {
                        _id: "$productCategory",
                        averagePrice: { $avg: "$productPrice" }
                    }
                }
            ])
            return avgPricePerCategory
        } catch (err) {
            console.log(err)
            if (err instanceof ApplicationError) throw err
            else throw new ApplicationError('database error', 500)
        }
    }

    async averageRating() {
        try {
            const productAvgRating = await ProductModel.aggregate([
                { $unwind: "$ratings" },
                {
                    $group: {
                        _id: "$productName",
                        "average rating": { $avg: "$ratings.rating" }
                    }
                }
            ])
            return productAvgRating
        } catch (err) {
            console.log(err)
            if (err instanceof ApplicationError) throw err
            else throw new ApplicationError('database error', 500)
        }
    }
}
