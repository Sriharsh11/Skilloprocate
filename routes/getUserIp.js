const router = require('express').Router();
const os = require('os');
const geoip = require('geoip-lite');
const expressip = require('express-ip');
var User = require('../models/user.js');
var ifaces = os.networkInterfaces();

router.use(expressip().getIpInfoMiddleware);

router.get('/ip', function (req, res) {
    const ipInfo = req.ipInfo;
    res.send(ipInfo);
    var message = `Hey, you are browsing from ${ipInfo.city}, ${ipInfo.country}`;
    res.send(message);
  });

// router.get('/ip',(req,res)=>{
//     res.render('getUserIp.ejs');
// });

// router.post('/ip',(req,res)=>{
//     var clientIP = req.connection.remoteAddress || req.headers['x-forwarded-for'];
//     res.send(clientIP);
// });


module.exports = router;
