var multer = require("multer")

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "uploads"))
    },
    filename: function (req, file, callback) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        const name = file.fieldname + "-" + uniqueSuffix
        const ext = file.mimetype.split("/")[1]
        file.uploadFile = {
            name: name, 
            ext: ext
        }
    }
})

var upload = multer({
    storage: storage,
    limits: {
        files: 10,
        filesize: 1024 * 1024 * 1024
    }
})

module.exports=upload