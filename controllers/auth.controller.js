const DB = require('../config/database')
import JWT from 'jsonwebtoken'
import bcrypte from 'bcryptjs'

export function signIn(request,response,next){
    DB.user.findOne({
        email: request.body.email
    })
    .populate("roles")
    .exec((error,user)=>{
        if (error){
          return response.status(500).send({message: error})
        }
        if (!user){
            return response.status(404).send({message: "Email or password wrong !"})
        }
        if (!bcrypte.compareSync(request.body.password,user.password)){
            return response.status(401).send({token:null,message: "Email or password wrong §!"})
        }

        let expire = null;
     
        if (request.body.remember == true){
            expire =  1000 * 60 * 60 * process.env.TOKEN_REMEMBER
        } else { 
            expire =  1000 * 60 * 60 * process.env.TOKEN_EXPIRATION
        }
            
        var JWT_token = JWT.sign({
            id:user.id,
            username:user.username,
            name:user.name,
            email:user.email,
        },process.env.JWT_SECRET,
        { expiresIn: expire*0.001 ,algorithm: process.env.JWT_ALGORITHEM})
        
        console.log(`${user.username} just logged in ✔️`);
        return response.status(200).cookie('token',JWT_token, {
            expires:new Date((new Date()).valueOf() + expire),
            secure:false, // True for HTTPS
            httpOnly:false,
        }).send({
            name:user.name,
            email:user.email,
            role:user.role,
            token:JWT_token
        })

       
       
    })
}

export function signUp(request,response){

    new DB.user({
        name:request.body.name,
        username:request.body.username,
        email:request.body.email,
        password: bcrypte.hashSync(request.body.password,8),
    }).save((error,user) => {
        if (error){
            response.status(500).send({message: error})
            return;
        } else {
            DB.role.findOne({
                name: "user"
            },(error,role)=>{
                if (error){
                    response.status(500).send({message: error})
                    return;
                } else {
                    user.role = role._id
                    user.save(err => {
                        if (err){
                            response.status(500).send({message: error})
                            return;
                        }
                        response.status(200).send({message: "User created successfully "})
                    })
                }
            })
        }
    }) 

}

export function logOut(request,response,next){
    if (request.cookies.token){
        JWT.verify(request.cookies.token,process.env.JWT_SECRET,(error,decoded)=>{
            if (error) return response.status(500).send({message:error})
            response.clearCookie('token')
            console.log(`${decoded.username} just logged out ✔️`);
            return response.status(200).json({message:"You have successfully logged out!"})
        })  
    } else {
        return next();
    }
   
}
