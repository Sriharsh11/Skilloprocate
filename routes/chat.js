const router = require('express').Router();
var User = require('../models/user.js');
var Message = require('../models/messages.js');

router.get('/chat',(req,res)=>{
    Message.find({},(err,messages)=>{
        if(err)
        throw err;
        else{
            res.render('chat.ejs',{messages});
        }
    });
});

router.post('/chat',(req,res)=>{
    var name = req.body.name;
    var message = req.body.message;
    var messages = new Message();
    messages.name = name;
    messages.message = message;
    messages.save((err)=>{
        if(err)
        throw err;
        else{
            res.send('message delivered successfully');
        }
    });
});

module.exports = router;