let express = require('express')
var router  = express.Router();

//import { isConnected } from '../middlewares/isConnected'

//router.use(isConnected)

router.get('/',(request,response) => {
    response.render("pages/index");
})

router.get('/auth/signin',(request,response) =>{
    response.render("auth/sign_in");
})

router.get('/auth/signup',(request,response) =>{
    response.render("auth/sign_up");
})

    

module.exports = router;