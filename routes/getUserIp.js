const router = require('express').Router();
const os = require('os');
const geoip = require('geoip-lite');
const expressip = require('express-ip');
var User = require('../models/user.js');
var ifaces = os.networkInterfaces();

router.use(expressip().getIpInfoMiddleware);

router.get('/getUserIp',(req,res)=>{
    res.render('getUserIp.ejs');
})

router.get('/ip', function (req, res) {
    const ipInfo = req.ipInfo;
    var location = ipInfo.ll;
    var lat = location[Object.keys(location)[0]];
    var lng = location[Object.keys(location)[1]];
    var latitude = lat.toString();
    var longitude = lng.toString();
    var user = new User({latitude,longitude});
    user.save((err,data)=>{
        if(err)
        throw err;
        else{
            res.redirect('/display');
        }
    });
  });


module.exports = router;
