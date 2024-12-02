import UserModel from "../features/user/user.model.js"

const basicAuthorizer = (req,res,next) => {
    // 1. check if header are empty
    const authHeader = req.headers['authorization']
    if(!authHeader) return res.status(401).send('No authorization details found')
    // console.log(authHeader)

    // 2. extract credentials . format - [Basic abcdefghijklmnopqrstuvwxyz]
    // - the credentials are encoded with base64 encoding (from client to server)
    // - it is a popular method for encoding
    const base64Credentials = authHeader.replace('Basic ', '')
    // console.log(base64Credentials)

    // 3. decoding credentials
    const decodedCred = Buffer.from(base64Credentials,'base64').toString('utf8')
    // console.log(decodedCred) // [username:password]
    const creds = decodedCred.split(':')

    const validateUser = UserModel.getAll().find(
        user => user.email===creds[0] && user.password==creds[1]
    )

    if(validateUser) next()
    else return res.status(401).send('Invalid Credentials')
}

export default basicAuthorizer