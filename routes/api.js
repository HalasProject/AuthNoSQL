const express = require('express')
const router = express.Router();

import { checkDuplicateUsernameOrEmail } from "../middlewares/checkDuplicateUsernameOrEmail";
import { signIn as loginController , signUp as registerController , logOut} from '../controllers/auth.controller'

router.get('/auth/logout',logOut)
router.post('/auth/signup',
            checkDuplicateUsernameOrEmail,
            registerController);

router.post('/auth/signin',
            loginController)


module.exports = router;
