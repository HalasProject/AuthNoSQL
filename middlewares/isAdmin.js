const DB = require('../config/database')

export function isAdmin(request,response,next) {
    DB.user.findById(request.userId).exec((error,user)=>{
        if (error){
            response.status(403).send({message: error})
            return;
        } else {
            DB.role.findOne({_id:user.role}).exec((error,role) => {
                if (error){
                    response.status(403).send({message: error})
                    return;
                } else {
                    DB.ROLES.forEach(a => {
                        if (a === role.name && role.name === 'admin'){
                            return next();
                        }
                    })
                    response.status(403).send({message: "Require Admin Role!"})
                    return;
                }
            })
        }
})
}
