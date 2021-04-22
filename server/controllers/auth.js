const User = require('../models/user');
const jwt = require('jsonwebtoken');
const sendgrid = require('@sendgrid/mail');
const _ = require('lodash');
const user = require('../models/user');
sendgrid.setApiKey('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');

exports.signup = (req, res) =>{
    const {username, email, password} = req.body;
    User.findOne({username: username}).exec((err, username) => {
        User.findOne({email: email}).exec((err, email) => {
            if(email && username){
                res.status(400).json({
                    error: 'Email and Username is taken'
                })
            }else if(username){
                res.status(400).json({
                    error: 'Username is taken'
                })
            }else if(email){
                res.status(400).json({
                    error: 'Email is taken'
                })
            }
        })
    })

    const token = jwt.sign({username, email, password}, process.env.JWT_ACCOUNT_ACTIVATION, {expiresIn: '10m'});
    const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Account activation link',
        html: `
            <p> Please use this following link to activate your account.. </p>
            <p> ${process.env.CLIENT_URL}/auth/activate/${token}</p>
        `
    }

    sendgrid.send(emailData).then(sent => {
        return res.json({
            message: `Email has been sent to ${email}.`
        });
    }).catch(err =>{
        return res.json({
            message: err.message
        });
    });
};

exports.accountActivation = (req , res) => {
    const {token} = req.body;
    if(token){
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded){
            if(err){
                return res.status(401).json({
                    error: 'Expired link. Signup again'
                });
            }
            const { username, email, password} = jwt.decode(token);
            const user = new User({username, email, password})
            user.save((err, user) => {
                console.log(err);
                if(err){
                    return res.status(401).json({
                        error: 'Error saving user into database. Try signup again'
                    });
                }
                return res.json({
                    message: 'Signup succesful. Please signin'
                });
            });
        });
    }else{
        return res.json({
            message: 'Something went wrong. Please try again.'
        });
    };
};

exports.signin = (req, res) => {
    const {email, password} = req.body;
    console.log(req.body);
    User.findOne({email}).exec((err, my_user) => {
        if(err || !my_user){
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup.'
            });
        }
        if(!my_user.authenticate(password)){
            return res.status(400).json({
                error: 'Email and password do not match'
            });
        }

        const token = jwt.sign({_id: my_user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        const {_id, username, email} = my_user;
        const updatedFields = {
            auth_token : token
        }
        my_user = _.extend(my_user, updatedFields);
        my_user.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: 'Error saving token to database'
                })
            }
            return res.json({
                token,
                user: {_id, username, email}
            });
        })
    });
};

exports.forgotPassword = (req , res) => {
    const {email} = req.body;
    User.findOne({email}, (err, user) => {
        if( err || !user){
            return res.status(400).json({
                error: 'User with that email does not exist'
            });
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_RESET_PASSWORD, {expiresIn: '10m'});

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Password Reset Link',
            html: `
                <h1>Please use the following link to reset your password</h1>
                <p>${process.env.CLIENT_URL}/auth/password-reset/${token}</p>
                <hr />
            `
        };
    
        return user.updateOne({resetPasswordLink: token}, (err, success) => {
            if(err){
                console.log('Reset password link error', err);
                return res.status(400).json({
                    error: 'Database connection error on user password forgot request'
                });
            }else{
                sendgrid.send(emailData).then(sent => {
                    return res.json({
                        message: `Email has been sent to ${email}` 
                    });
                }).catch(error => {
                    return res.json({
                        message: error.message
                    });
                });
            }
        });
    });
};

exports.resetPassword = (req, res) => {
    const {resetPasswordLink, newPassword} = req.body;
    if(resetPasswordLink){
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decoded){
            if(err){
                return res.status(400).json({
                    error: 'Expired link. Please try again.'
                });
            }
            User.findOne({resetPasswordLink}, (err, user) => {
                if(err || !user){
                    return res.status(400).json({
                        error: 'Something went wrong. Try again later.'
                    });
                }
                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: ''
                };

                user = _.extend(user, updatedFields);

                user.save((err, result) => {
                    if(err){
                        return res.status(400).json({
                            error: 'Error resetting user password'
                        });
                    }
                    res.json({
                        message: 'Now you can login with your new password'
                    });
                });
            });
        });
    }
};