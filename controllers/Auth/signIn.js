const DB = require('../../config/database')
const JWT = require('jsonwebtoken')
const bcrypte = require('bcryptjs')

function signIn(request,response){
    console.log(request.body)
    DB.user.findOne({
        email: request.body.email
    })
    .populate("roles")
    .exec((error,user)=>{
        if (error){
          response.status(500).send({message: error})
          return;
        }
        if (!user){
            response.status(404).send({message: "Email or password wrong !"})
        }
        if (!checkPasswordValid(request.body.password,user.password)){
            return response.status(401).send({token:null,message: "Email or password wrong §!"})
        }
            var JWT_token = JWT.sign({id:user.id},process.env.JWT_SECRET,{ expiresIn:process.env.TOKEN_EXPIRATION ,algorithm: process.env.JWT_ALGORITHEM})
           
            response.cookie('token',JWT_token, {
                expires: new Date(Date.now() + process.env.TOKEN_EXPIRATION),
                secure:false, // True for HTTPS
                httpOnly:true,
            }).status(200).send({
                name:user.name,
                email:user.email,
                role:user.role,
                token:JWT_token
            })

        
    })
}

function checkPasswordValid(bodyPassword,realPassword){
    return bcrypte.compareSync(bodyPassword,realPassword)
}

module.exports = signIn;