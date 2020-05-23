let express = require('express')
var router  = express.Router();
    
router.get('/',(request,response) =>{
    response.redirect('/auth/signin')
})

router.get('/auth/signin',(request,response) =>{
    response.render("auth/sign_in.ejs");
})

router.get('/auth/signup',(request,response) =>{
    response.render("auth/sign_up.ejs");
})
    

module.exports = router;