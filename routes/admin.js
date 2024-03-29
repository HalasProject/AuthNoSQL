const express = require("express")
const router = express.Router();

const controller = require('../controllers/user.controller')

import { isAdmin } from "../middlewares/isAdmin";
import { verifyToken } from "../middlewares/verifyToken";

router.use([verifyToken,isAdmin])

router.get("/",
            controller.adminBoard);

module.exports = router;
