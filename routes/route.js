let express = require('express')
var router  = express.Router();

import { isConnected } from '../middlewares/isConnected'

function Connected(request,response,next){
    console.log("Connected function"+response.locals.user)
    if(response.locals.user){
        return response.status(400).redirect('/')
    } else {
        return next()
    }
}

router.use(isConnected)

router.get('/',(request,response) => {
    response.render("pages/index");
})

router.get('/auth/signin',Connected,(request,response) =>{
    response.render("auth/sign_in");
})

router.get('/auth/signup',Connected,(request,response) =>{
    response.render("auth/sign_up");
})

    

module.exports = router;