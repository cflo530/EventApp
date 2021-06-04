const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret ='verySecureSECRET';
const expiry = 3600;

exports.registerNewUser = (req, res) => {
    User.findOne({email: req.body.email}, (err, existingUser) => {
        if(err){
            return res.status(500).json({err});
        }
        if(existingUser){
            return res.status(400).json({message: 'user with email already exoist'});
        }
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }, (err, newUser) => {
            if(err){
                return res.status(500).json({err});
            }
            bcrypt.genSalt(10, (err, salt) => {
                if(err){
                    return res.status(500).json({err});
                }
                bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                    if(err){
                        return res.status(500).json({err});
                    }
                    newUser.password = hashedPassword;
                    newUser.save((err, savedUser) => {
                        if(err){
                            return res.status(500).json({err});
                        }
                        jwt.sign({
                            id: newUser._id,
                            email: newUser.email,
                            firstName: newUser.firstName,
                            lastName: newUser.lastName
                        }, secret, {expiresIn: expiry}, (err, token) => {
                            if(err){
                                return res.status(500).json({err});
                            }
                            return res.status(200).json({message: 'User registration successful'});
                        })
                    })
                })
            })
        })
    })
};

exports.loginUser = (req, res) => {
    User.findOne({email: req.body.email}, (err, foundUser) => {
        if(err){
            return res.status(500).json({err});
        }
        if(!foundUser){
            return res.status(401).json({message: 'Incorrect email'});
        }
        let match = bcrypt.compareSync(req.body.password, foundUser.password);
        if(!match){
            return res.status(401).json({message: 'Incorrect password'});
        }
        jwt.sign({
            id: foundUser._id,
            email: foundUser.email,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName
        }, secret, {expiresIn: expiry}, (err, token) => {
            if(err){
                return res.status(500).json({err});
            }
            return res.status(200).json({message: 'Login successful'});
        })
    })
};