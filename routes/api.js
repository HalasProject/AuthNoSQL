const express = require('express')
const router = express.Router();

import { checkDuplicateUsernameOrEmail } from '../middlewares/checkDuplicateUsernameOrEmail'

const controller_signup = require('../controllers/Auth/singUp')
const controller_signin = require('../controllers/Auth/signIn')

router.post('/auth/signup',checkDuplicateUsernameOrEmail,controller_signup);
router.post('/auth/signin',controller_signin)


module.exports = router;
