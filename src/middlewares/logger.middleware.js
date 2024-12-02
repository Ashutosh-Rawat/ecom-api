import fs from 'fs/promises'
import winston from 'winston'

// async function log(address, method, data, statusCode, statusMessage) {
//     try {
//         // make the timestamps, url and req method
//         let logData = `${new Date().toISOString()} - [URL: localhost:3100${address}] ${method}`
//         // add the body object if present
//         if (Object.keys(data).length) logData += ` [Body: ${JSON.stringify(data)}]`
//         // add the response code and response message
//         logData += ` [Response: (${statusCode}) ${statusMessage}]\n`
//         await fs.writeFile('log.txt', logData, { flag: 'a' })
//     } catch (err) {
//         console.log(err)
//     }
// }

// async function loggingMiddleware(req, res, next) {
//     // 1. log request body
//     if(!req.url.includes('signin') && !req.url.includes('signup')) {
//         res.on('finish', 
//             async () => log(req.originalUrl, req.method, req.body, res.statusCode, res.statusMessage))
//     }
//     next()
// }

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'request-logging' },
    transports: [
        new winston.transports.File({filename: 'log.txt'})
    ]
})

const loggingMiddleware = (req,res,next) => {
    if(!req.url.includes('signup') && !req.url.includes('singin')) {
        res.on('finish', () => {
            const logData = `${req.originalUrl} - ${JSON.stringify(req.body)} [response: (${res.statusCode}) ${res.statusMessage}]`
            logger.info(logData)
        })
    }
    next()
}

export default loggingMiddleware
