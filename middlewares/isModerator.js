
export function isModerator(request,response,next){
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
