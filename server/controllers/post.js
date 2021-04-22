const user = require('../models/user');

exports.Postit = (req, res) => {
    const username = req.body.username;
    user.findOne({username}).exec((err, User) => {
        if(req.body.auth_token === User.auth_token){
            User.updateOne({$push : {posts:{data: req.body.post}}},(err, result) => {
                if(err){
                    res.status(400).json({
                        Error: 'Post send error'
                    });
                }
                return res.json({
                    message: 'Posted succesfully..'
                });
            })
        }else{
            return res.status(400).json({
                Error: "You don't have permission to post"
            })
        }
    });
}

