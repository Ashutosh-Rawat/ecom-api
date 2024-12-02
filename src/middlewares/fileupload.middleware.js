import multer, { diskStorage } from "multer"
import path from 'path'

const storage = diskStorage({
    destination: (req,file,cb) => {
        cb(null, path.resolve('src','uploads'))
    },
    filename: (req,file,cb) => {
        const name = Date.now()+"-"+file.originalname
        cb(null, name)
    }
})

const uploadFile = multer({ storage })
export default uploadFile
