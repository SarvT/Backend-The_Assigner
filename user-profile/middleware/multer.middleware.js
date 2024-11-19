import multer from "multer";

// multer configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        // folder to upload  files on server
        cb(null, "./public/temp")
    },
    filename: function(req, file, cb){
        // filename
        cb(null, file.originalname)
    }
})
export const upload = multer({storage:storage})