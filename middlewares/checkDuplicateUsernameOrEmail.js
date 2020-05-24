const DB = require('../config/database')


export function checkDuplicateUsernameOrEmail(request,response,next){
    if (request.body.password.length < 6){
        response.status(500).send({message: "Please choose a longer password"})
        return;
    }
    // Check for username if already exist
    DB.user.findOne({
        username: request.body.username
    }).exec((error,user) => {
        if(error) {
            response.status(500).send({message: error})
            return;
        } else if (user) {
            response.status(400).send({message: "Sorry this username is already exist "})
            return;
        }
    })

    // Check for email if already exist
    DB.user.findOne({
        email: request.body.email
    }).exec((error,user) => {
        if(error) {
            response.status(500).send({message: error})
            return;
        } else if (user) {
            response.status(400).send({message: "Sorry this email is already exist"})
            return;
        }
    })
    
    next();
}
