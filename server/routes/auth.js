const express = require('express');
const router = express.Router();

const { signup, accountActivation, signin, resetPassword, forgotPassword } = require('../controllers/auth');
const { userSignupValidator, userSignInValidator, forgotPasswordValidator, resetPasswordValidor } = require('../validators/auth');
const { runValidation } = require('../validators/index');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSignInValidator, runValidation, signin);
router.post('/account-activation', accountActivation);
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password', resetPasswordValidor, runValidation, resetPassword);
module.exports = router;