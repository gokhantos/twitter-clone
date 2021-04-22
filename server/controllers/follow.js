const User = require('../models/user');
const _ = require('lodash');


exports.follow = (req, res) => {
    const following_user = req.body.username;
    const followed_user = req.body.followed_user;
    const auth_token = req.body.auth_token;
    User.findOne({username: following_user}).exec((err,user_1) => {
        if(auth_token === user_1.auth_token){
            User.findOne({username: followed_user}).exec((err, user_2) => {
                if(err){
                    res.status(400).json({
                        error: "User does not exist"
                    });
                }

                user_1.updateOne({$push: {followings:{username: followed_user}}}, (err, result) =>{
                    if(err){
                        res.status(400).json({
                            error: "Error following this user"
                        })
                    }

                    user_2.updateOne({$push: {followers:{username: following_user}}},(err, result2) => {
                        if(err){
                            res.status(400).json({
                                error: "Error following this user"
                            })
                        }

                        return res.json({
                            message: "User followed succesfully"
                        })
                    })
                })
            })

        }else{
            res.status(400).json({
                error: "You don't have permission to follow user."
            })
        }


    })

}

exports.isFollowed = (req, res) => {
    const following_user = req.body.username;
    const followed_user = req.body.followed_user;
    User.findOne({username: following_user}).exec((err,user_1) => {
        user_1.followings.forEach(element => {
            if(element.username == followed_user){
                return res.json({
                    message: 'Following'
                })
            }
        })
       
    })
}

exports.unfollow = (req, res) => {
    const following_user = req.body.username;
    const followed_user = req.body.followed_user;
    const auth_token = req.body.auth_token;

    User.findOne({username: following_user}).exec((err,user_1) => {
        if(auth_token === user_1.auth_token){
            User.findOne({username: followed_user}).exec((err, user_2) => {
                if(err){
                    res.status(400).json({
                        error: "User does not exist"
                    });
                }

                user_1.updateOne({$pull: {followings:{username: followed_user}}}, (err, result) =>{
                    if(err){
                        res.status(400).json({
                            error: "Error unfollowing this user"
                        })
                    }

                    user_2.updateOne({$pull: {followers:{username: following_user}}},(err, result2) => {
                        if(err){
                            res.status(400).json({
                                error: "Error unfollowing this user"
                            })
                        }

                        return res.json({
                            message: "User unfollowed succesfully"
                        })
                    })
                })
            })

        }else{
            res.status(400).json({
                error: "You don't have permission to follow user."
            })
        }


    })
}