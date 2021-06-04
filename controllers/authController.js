const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {createToken} = require('../services/jwtService');

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
                        let token = createToken(newUser);
                        if(!token){
                            return res.status(500).json({message: "Sorry, could not authenticate. Please login."})
                        }
                        return res.status(200).json({ 
                            message:"user registration successful",
                            token
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
        let token = createToken(foundUser);
        if(!token){
            return res.status(500).json({message: "Sorry, could not authenticate. Please login."})
        }
        return res.status(200).json({ 
            message:"user login successful",
            token
        })
    })
};