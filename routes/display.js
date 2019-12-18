const router = require('express').Router();
var http = require('http').Server(router);
var io = require('socket.io')(http);
var User = require('../models/user.js');
var Message = require('../models/messages.js');

router.get('/display',(req,res)=>{
    User.find({},(err,user)=>{
        if(err)
        throw err;
        else{
            res.render('display.ejs',{user});
        }
    });
});

router.get('/about/:id',(req,res)=>{
    User.findOne({_id:req.params.id},(err,user)=>{
        if(err) 
        throw err;
        else{
            res.render('about.ejs',{user});
        }
    });
});

router.get('/chat',(req,res)=>{
    Message.find({},(err,messages)=>{
        if(err)
        throw err;
        else{
            // res.render('chat.ejs',{messages});
            console.log(messages);
            // res.send(messages);
        }
    });
});

router.post('/chat',(req,res)=>{
    var message = new Message(req.body);
    message.save((err)=>{
        if(err)
        throw err;
        else{
            io.emit('message',req.body);
        }
    });
});

io.on('connection', () =>{
    console.log('a user is connected')
  });

module.exports = router;