const express = require('express');
const router = express.Router();

const {Postit} = require('../controllers/post');

router.post('/post', Postit);

module.exports = router;