const DB = require('../../config/database')
const JWT = require('jsonwebtoken')
const bcrypte = require('bcryptjs')

function signIn(request,response){
    DB.user.findOne({
        email: request.body.email
    })
    .populate("role")
    .exec((error,user)=>{
        if (error){
          response.status(500).send({message: error})
          return;
        } else if (!user){
            response.status(404).send({message: "Email or password wrong !"})
        } else if (!checkPasswordValid){
            return response.status(401).send({token:null,message: "Email or password wrong !"})
        } else {
            var JWT_token = JWT.sign({id:user.id},process.env.JWT_SECRET,{ expireIn:86400 ,algorithm: 'HS512'})

            response.status(200).send({
                name:user.name,
                email:user.email,
                role:user.role,
                token:JWT_token
            })
        }
    })
}

function checkPasswordValid(bodyPassword,realPassword){
    return valide = bcrypte.compareSync(
        realPassword,
        bodyPassword
    )
}

module.exports = signIn;