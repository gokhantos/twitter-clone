const express = require('express');
const router = express.Router();

const {userPage} = require('../controllers/user');

router.post('/user', userPage);

module.exports = router;