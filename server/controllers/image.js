const express = require('express');
const user = require('../models/user');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');

exports.imageUpload = (req, res) => {
    const username = 'gokhann';
    console.log(req.body);
        const image = {
            data: req.body.imageName,
            contentType: 'image/jpeg'
        }
        res.json({
            message: 'sent'
        });
        user.findOne({username}, (error, User) => {
            if(error || !User){
                return res.status(400).json({
                    error: 'User does not exist'
                });
            }
    
    
    
            User = _.extend(User, image);
    
            User.save((err, result) => {
                if(err){
                    return res.status(400).json({
                        error: 'Error uploading picture'
                    });
                }
    
                res.json({
                    message: 'Profile picture updated'
                });
            })
        })
}

