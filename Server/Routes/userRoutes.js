const express = require("express");
const router = express.Router();
const {signUp, login, deleteCookie} = require("../Controller/userController")

router.post('/signup', signUp)
router.post('/login', login)


router.post('/logout', deleteCookie)

module.exports = router;