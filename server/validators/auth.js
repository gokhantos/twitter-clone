const { check } = require('express-validator');

exports.userSignupValidator = [
    check('username')
    .not()
    .isEmpty()
    .withMessage('Username required.'),
    check('email')
    .isEmail()
    .withMessage('Must be a valid e-mail address'),
    check('password')
    .isLength({min: 8})
    .withMessage('Password must be at least 8 characters.')
];

exports.userSignInValidator = [
    check('email')
    .isEmail()
    .withMessage('Must be a valid e-mail address'),
    check('password')
    .isLength({min: 8})
    .withMessage('Password must be at least 8 characters.')
];

exports.forgotPasswordValidator = [
    check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Must be a valid email address')
];

exports.resetPasswordValidor = [
    check('newPassword')
    .not()
    .isEmpty()
    .isLength({min: 8})
    .withMessage('Password must be at least 8 characters.')
];