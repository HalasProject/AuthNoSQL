const DB = require("../config/database")
import JWT from 'jsonwebtoken'

export function isConnected(request,response,next){
    let token = request.cookies.token
    if(token){
        JWT.verify(token,process.env.JWT_SECRET,(error,decoded) => {
            if (error){
                return response.status(500).send({message:error})
            } else {
                DB.user.findOne({_id:decoded.id}).exec((error,user)=> {
                    if (error){
                        return response.status(500).send({message:error})
                    } if (!user) {
                        return response.status(404).send({message: "User does not exist ❌ "})
                    } else {
                        response.locals.user = {
                            name:user.name,
                            email:user.email,
                        }
                        return next()
                    }
                })
            }
        })
    } else {
        return next()
    }
}