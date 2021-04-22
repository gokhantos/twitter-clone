const user = require('../models/user');
const posts = require('../models/posts');


exports.userPage = (req, res) =>{
    const {username} = req.body;
    user.findOne({username: username}).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: 'User does not exist'
            });
        }
        var user_posts = [];
        user.posts.forEach(results => {
            user_posts.push(results);
        })
        return res.json({
            posts: user_posts,
            profile_picture: user.profilePicture
        })

    })
};