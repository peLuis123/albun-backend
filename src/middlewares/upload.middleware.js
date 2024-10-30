const multer = require('multer')
const path = require('path')
const fs = require('fs')
const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        const uploadPath = 'public/images' 
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true })
        }
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        console.log('test')
        const ext = path.extname(file.originalname)
        cb(null, `${file.fieldname}-${Date.now()}${ext}`)
    }
})
const upload = multer({ storage })
module.exports = upload
