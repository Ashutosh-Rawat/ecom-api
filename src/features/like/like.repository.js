import { model } from 'mongoose'
import likeSchema from './like.schema.js'
import { ApplicationError } from '../../middlewares/applicationError.middleware.js'
import { ObjectId } from 'mongodb'

const LikeModel = model('like', likeSchema)

export default class LikeRepository {
    async likeProduct(userId, productId) {
        try {
            const newLike = new LikeModel({
                user: new ObjectId(userId),
                likeable: new ObjectId(productId),
                dbtype: 'products'
            })
            await newLike.save()
        } catch (err) {
            console.log(err)
            throw new ApplicationError('database error', 500)
        }
    }

    async likeCategory(userId, categoryId) {
        try {
            const newLike = new LikeModel({
                user: new ObjectId(userId),
                likeable: new ObjectId(categoryId),
                dbtype: 'categories'
            })
            await newLike.save()
        } catch (err) {
            console.log(err)
            throw new ApplicationError('database error', 500)
        }
    }

    async getLikes(id, type) {
        const likedItems = await LikeModel.find({
            likeable: new ObjectId(id),
            dbtype: type
        }).populate('user').populate({ path: 'likeable', model: type })
        return likedItems
    }
}
