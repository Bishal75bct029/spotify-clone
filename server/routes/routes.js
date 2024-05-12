const express = require('express');
const { model } = require('mongoose');
const { PlaySong, getSong } = require('../controllers/playSong');
const router = express.Router();

router.get('/',PlaySong
    
);

router.get('/play-song',getSong);
module.exports = router;