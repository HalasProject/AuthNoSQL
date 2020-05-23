const JWT = require('jsonwebtoken')
const DB = require('../config/database')


function verifyToken(request,response,next){
    let token = request.headers['x-access-token'];

    if (!token){
        response.status(403).send({message: "No token provided"})
    }
    JWT.verify(token,process.env.JWT_SECRET,(error,decode) => {
       if (error){
           response.status(401).send({message: "Error in token Unauthorized!"})
       }
       request.userId = decode.id;
       next();
    })
}

function isAdmin(request,response,next){
    DB.user.findById(request.userId).exec((error,user)=>{
        if (error){
            response.status(403).send({message: error})
            return;
        }
    })

    DB.role.find({_id:request.userId}).exec((error,role) => {
        if (error){
            response.status(403).send({message: error})
            return;
        } else {
            DB.ROLE.forEach(a => {
                if (a === role && role === 'admin'){
                    next();
                    return;
                }
            })
            response.status(403).send({message: "Require Admin Role!"})
            return;
        }
    })
}

function isModerator(request,response,next){
    DB.user.findById(request.userId).exec((error,user)=>{
        if (error){
            response.status(403).send({message: error})
            return;
        }
    })

    DB.role.find({_id:request.userId}).exec((error,role) => {
        if (error){
            response.status(403).send({message: error})
            return;
        } else {
            DB.ROLE.forEach(a => {
                if (a === role && role === "moderator"){
                    next();
                    return;
                }
            })
            response.status(403).send({message: "Require Moderator Role!"})
            return;
        }
    })
}

const authentification = {
    verifyToken,
    isAdmin,
    isModerator
}

module.exports = authentification;