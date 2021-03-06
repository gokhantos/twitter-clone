const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        max: 16
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    auth_token: {
        type: String
    },
    hashed_password: {
        type: String,
        trim: true,
        required: true,
    },
    resetPasswordLink: {
        default: '',
        data: String
    },
    profilePicture: {
        data: String,
        default:'',
        imageName: {
            type: String,
        },
        imageData: {
            type: Buffer,
        }
    },
    salt: String,
    posts: [{
        data: String,
        default: '',
        date: {
            type: Date,
            default: Date.now
        }
    }],
    followings: [{
        username: String,
        default: '',
        date: {
            type: Date,
            default: Date.now
        }
    }],
    followers: [{
        username: String,
        default: '',
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, {timestamps: true});

userSchema.virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function(){
        return this._password;
    });

userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function(password){
        if(!password) return '';
        try{
            return crypto.createHmac('sha1', this.salt)
                            .update(password)
                            .digest('hex');
        }catch(err){
            return '';
        }
    },
    makeSalt: function(){
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
}

module.exports = mongoose.model('User', userSchema);