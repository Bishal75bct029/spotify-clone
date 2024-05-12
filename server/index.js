require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/routes.js');
const {PlaySong,getSong} = require('./controllers/playSong.js');
const PORT = process.env.PORT || 80;


app.use('/',routes);
app.listen(PORT,()=>{
    //"server started successfully on port ",PORT);
});