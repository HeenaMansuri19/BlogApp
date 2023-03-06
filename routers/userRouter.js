const express = require('express');
const router = express.Router()
const user = require('../controllers/userController')
const { upload } = require('../middlewares/imageStorage');
const validation = require('../validations/user/userValidation')

router.post("/register", upload.single("profilePic"), validation.registerUserValidation, user.userSignUp)
router.post("/userLogin",validation.loginUserValidation,user.userLogin)
router.post("/resetPassEmail", user.resetPasswordSendEmail)
router.post("/userResetPassword/:id/:token", user.userResetPassword)

module.exports = router;