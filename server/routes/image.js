const express = require('express');
const router = express.Router();
const user = require('../models/user');
const multer = require('multer');
const _ = require('lodash');
const fs = require('fs');
const {imageUpload} = require('../controllers/image');
const { runValidation } = require('../validators/index');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null,Date.now() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else {
        cb(null, false);
    }
}


var upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.route('/image').post(upload.single('profilePic'), (req,res) => {
    const username = req.body.username;
    user.findOne({username}, (error, User) => {
        const updatedFields = {
            profilePicture: {
                imageName: req.file.filename,
                imageData: fs.readFileSync(req.file.path)
            }
        }
        if(req.body.token === User.auth_token){
            User = _.extend(User, updatedFields);
            User.save((err, result) => {
                if(err){
                    console.log(err);
                    return res.status(400).json({
                        error: 'Error uploading picture'
                    });
                }
    
                res.json({
                    message: 'Profile picture updated'
                });
            })
        }else{
            res.status(400).json({
                Error: "You don't have permission to change Profile Picture"
            })
        }

    })
});
module.exports = router;