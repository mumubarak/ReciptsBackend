const multer =require('multer')
const path=require('path')

var storageCategory =  multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/img_category');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
var uploadCategory = multer({ 
  storage: storageCategory,
  limits:{ fileSize: 1000000000 },
    fileFilter: function(req, file, cb){
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
          ) {
            cb(null, true);
          } else {
            cb(null, false);
          }
    }
 });

module.exports = uploadCategory