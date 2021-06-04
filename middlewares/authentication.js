const jwt = require('jsonwebtoken');
const secret ='verySecureSECRET';

exports.authenticateUser = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).json({message: 'Authorization header required'});
    }
    let splittedHeader = req.headers.authorization.split(' ');
    if(splittedHeader[0] !== 'Bearer'){
        return res.status(401).json({message: 'Authorization format is Bearer <token>'});
    }
    let token = splittedHeader[1];
    jwt.verify(token, secret, (err, decodedToken) => {
        if(err){
            return res.status(500).json({err});
        }
        if(!decodedToken){
            return res.status(401).json({message: 'Invalid authorization token. Please login'});
        }
        console.log(decodedToken);
        req.user = decodedToken;
        next();
    })
};

exports.checkIfAdmin = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(401).json({message: 'This route is restricted to admin users'});
    }
    return next();
};