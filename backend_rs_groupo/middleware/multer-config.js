const multer = require('multer')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'video/webm': 'webm'
};



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file.mimetype)
        if(file == undefined){
            cb()
        }
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        if(file == undefined){
            cb()
        }
        console.log(MIME_TYPES[file.mimetype])
        const extension = MIME_TYPES[file.mimetype];
        let fileName = file.originalname.replace(' ', '-').replace('.'+extension,'') +'-'+ Date.now()+'.'+extension
        cb(null, fileName)
    }
})

module.exports = multer({storage: storage}).single('image');
