const DB = require('../../config/database')
const bcrypte = require('bcryptjs')

function signUp(request,response){

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


module.exports = signUp;