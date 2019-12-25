const router = require('express').Router();
const os = require('os');
const geoip = require('geoip-lite');
var User = require('../models/user.js');
var ifaces = os.networkInterfaces();

router.get('/ip',(req,res)=>{
    res.render('getUserIp.ejs');
});

router.post('/ip',(req,res)=>{
    var clientIP = req.connection.remoteAddress;
    res.send(clientIP);
});


module.exports = router;
