const router = require('express').Router();
const os = require('os');
const geoip = require('geoip-lite');
var User = require('../models/user.js');
var ifaces = os.networkInterfaces();

router.get('/ip',(req,res)=>{
    res.render('getUserIp.ejs');
});

router.post('/ip',(req,res)=>{
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;
      
        ifaces[ifname].forEach(function (iface) {
          if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
          }
      
          if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, iface.address);
          } else {
            // this interface has only one ipv4 adress
            var ip = iface.address;
            console.log(ifname,iface.address);
            var geo = geoip.lookup(ip);
            //console.log(geo);
            res.send(geo);
          }
          ++alias;
        });
      });
});

module.exports = router;
