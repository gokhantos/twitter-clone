const express = require('express');
const router = express.Router();

const { follow, isFollowed, unfollow } = require('../controllers/follow');

router.post('/follow', follow);
router.post('/isfollowed', isFollowed);
router.post('/unfollow', unfollow);

module.exports = router;