import jwt from 'jsonwebtoken'

const jwtAuth = (req,res,next) => {
    // 1. read the token
    const token = req.headers['authorization']
    // 2. if no token, return the error
    if(!token) return res.status(401).send('Unauthorized access')
    // 3. check if the token is valid
    // it returns the payload and may throw errors
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(payload)
        req.userId = payload.userId
    // 4. return the error
    } catch(err) {
        return res.status(401).send('Unauthorized access')
    }
    // 5. call next middleware
    next()
}

export default jwtAuth