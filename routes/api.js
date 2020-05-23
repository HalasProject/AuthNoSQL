const express = require('express')
const router = express.Router();



const verifySignUp = require('../middlewares/verifySignUp')
const controller_signup = require('../controllers/Auth/singUp')

const controller_signin = require('../controllers/Auth/signIn')

router.post('/auth/signup',verifySignUp.checkDuplicateUsernameOrEmail,controller_signup);
router.post('/auth/signin',controller_signin)

module.exports = router;
