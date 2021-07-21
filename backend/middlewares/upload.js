const multer = require('multer')

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/uploads/pdf')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + '_' + file.originalname)
        }
    }),
    fileFilter: (req, file, cb) => {
        const extensaoPDF = ['application/pdf'].find
        (formatoAceito => formatoAceito == file.mimetype)

        if(extensaoPDF){
            return cb(null, true)
        }
        return cb(null, false)
    } 
}))