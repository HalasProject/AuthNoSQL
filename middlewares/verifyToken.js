const JWT = require('jsonwebtoken')
const DB = require('../config/database')


export function verifyToken(request,response,next){
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

