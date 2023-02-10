import multer, { diskStorage } from 'multer'
import { resolve, extname } from 'path'

const randomNumbers = () => Math.floor(Math.random() * 10000 + 10000)

export const multerConfig = {
  fileFilter: (req, file, cb) => {
    const { mimetype } = file

    if(mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('O arquivo precisa ser PNG ou JPG'))
    }

    return cb(null, true)
  },
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'upload', 'images'))
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${randomNumbers()}${extname(file.originalname)}`)
    }
  })
}