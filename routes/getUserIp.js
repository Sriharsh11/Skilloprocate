const router = require('express').Router();
const os = require('os');
const geoip = require('geoip-lite');
const expressip = require('express-ip');
const geolib = require('geolib');
var User = require('../models/user.js');
var ifaces = os.networkInterfaces();

router.use(expressip().getIpInfoMiddleware);

router.get('/getUserIp',(req,res)=>{
    res.render('getUserIp.ejs');
})

router.get('/ip', function (req, res) {
    var username = req.cookies['username'];
    //var id = req.params.id;
    const ipInfo = req.ipInfo;
    var location = ipInfo.ll;
    var lat = location[Object.keys(location)[0]];
    var lng = location[Object.keys(location)[1]];
    var latitude = lat.toString();
    var longitude = lng.toString();
    User.findOneAndUpdate({username: username},{$set:{latitude:latitude , longitude: longitude}},(err)=>{
        if(err)
        throw err;
        else{
            res.redirect('/display');
        }
    });
  });

  router.get('/nearestUsers',(req,res)=>{
    var username = req.cookies['username'];
    var closestUsers = [];
    User.findOne({username: username},(err,user)=>{
        if(err)
        throw err;
        else{
            
            var lat = parseFloat(user.latitude);
            var lng = parseFloat(user.longitude);
            User.find({},(err,nearUsers)=>{
                if(err)
                throw err;
                else{
                    for(var i=0;i<nearUsers.length;i++){
                        if(nearUsers[i].username!=username){
                            if(geolib.isPointWithinRadius(
                                { latitude: parseFloat(nearUsers[i].latitude), longitude: parseFloat(nearUsers[i].longitude) },
                                { latitude: lat, longitude: lng },
                                1000000
                            )){
                                closestUsers.push(nearUsers[i]);
                            }
                        }
                    }
                    res.render('nearestUsers.ejs',{closestUsers});
                }
            });
        }
    });
  });
  

module.exports = router;