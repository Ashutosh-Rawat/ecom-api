import { ApplicationError } from "../../middlewares/applicationError.middleware.js"
import LikeRepository from "./like.repository.js"

export default class LikeController {
    constructor() {
        this.likeRepository = new LikeRepository()
    }

    async likeItem(req, res, next) {
        try {
            const { id, type } = req.body
            if (type !== 'products' && type !== 'categories')
                throw new ApplicationError('invalid type', 400)

            const userId = req.userId
            if (type === 'products') {
                await this.likeRepository.likeProduct(userId, id)
            } else {
                await this.likeRepository.likeCategory(userId, id)
            }
            res.status(200).send(`${type} liked`)
        } catch (err) {
            next(err)
        }
    }

    async getLikes(req, res, next) {
        try {
            const { id, type } = req.query
            const likes = await this.likeRepository.getLikes(id, type)
            res.status(200).send(likes)
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}
