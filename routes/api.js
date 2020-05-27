const express = require('express')
const router = express.Router();

import { checkDuplicateUsernameOrEmail } from "../middlewares/checkDuplicateUsernameOrEmail";
import { signIn as loginController , signUp as registerController , logOut} from '../controllers/auth.controller'
import { isConnected } from "../middlewares/isConnected"


function Connected(request,response,next){
    console.log("Connected function"+response.locals.user)
    if(response.locals.user){
        return response.status(400).redirect('/')
    } else {
        return next()
    }
}

router.use(isConnected)

router.get('/auth/logout',logOut)



router.post('/auth/signup',
        Connected,
        checkDuplicateUsernameOrEmail,
        registerController);

router.post('/auth/signin',
        Connected,
        loginController)


module.exports = router;
