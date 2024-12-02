import { ApplicationError } from "../../middlewares/applicationError.middleware.js"
import UserModel from "./user.model.js"
import jwt from 'jsonwebtoken'
import UserRepository from "./user.repository.js"
import bcrypt from 'bcrypt'

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository()
    }
    async signUp(req, res, next) {
        try {
            if (!Object.keys(req.body).length) throw new ApplicationError('No user data input', 400)
                const {name,email,password,type} = req.body
                const hashedPassword = await bcrypt.hash(password, 12)
                // the more saltrounds/more slower is the hashing and more secure the hashing
                const userModelObj = new UserModel(name,email,hashedPassword,type)
                const newUserId = await this.userRepository.addUser(userModelObj)
                res.status(200).send(`UserId ${newUserId} added successfully`)
        } catch(err) {
            if(!err instanceof ApplicationError) console.log(err)
            next(err)
        }
    }

    async signIn(req, res, next) {
        try {
            if (!Object.keys(req.body).length) throw new ApplicationError('No user data input', 401)
            const {email,password} = req.body
            const validUser = await this.userRepository.findByEmail(email)
            if(!validUser) throw new ApplicationError('user not found', 404)
            const validation = bcrypt.compare(password,validUser.password)
            if(!validation) throw new ApplicationError('invalid credentials', 400)
                // 1. create token
                // the string is the secretOrPrivateKey (an arg for secret key)
                // on the later obj is the options - expires in (1) 
            const token = jwt.sign(
                { userId: validUser._id, email: validUser.email }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1h' }
            )
            res.status(200).send(token)
        } catch (err) {
            if(err instanceof ApplicationError) next(err)
            else {
                console.log(err)
                throw new ApplicationError('error while signing in', 400)
            }
        }
    }

    async resetPassword(req,res,next) {
        try {
            const {newPassword} = req.body
            const userId = req.userId
            const hashedPassword = await bcrypt.hash(newPassword, 12)
            await this.userRepository.resetPassword(userId,hashedPassword)
            res.status(200).send('password for user updated successfully')
        } catch(err) {
            next(err)
        }
        
    }
}
