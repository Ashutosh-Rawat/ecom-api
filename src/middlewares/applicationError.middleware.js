import { logger } from './logger.middleware.js'
import mongoose from 'mongoose'

export class ApplicationError extends Error {
    constructor(message,code) {
        super(message)
        this.code = code
    }
}

const applicationErrorHandler = (err,req,res,next) => {
    if(!req.url.includes('signup') && !req.url.includes('singin')) {
        res.on('finish', () => {
            const logData = `${req.originalUrl} - ${JSON.stringify(req.body)} [response: (${res.statusCode}) ${res.statusMessage}]`
            logger.info(logData)
        })
    }
    // if error is ApplicationError object then write status code
    if(err instanceof ApplicationError) {
        return res.status(err.code).json({response: false, message: err.message})
    }
    else if(err instanceof mongoose.Error.ValidationError)
        return res.status(400).json({response: false, message: err.message})
    // only for server errors
    res.status(500).json({response: false, message: 'something went wrong, please try later'})
}

export default applicationErrorHandler