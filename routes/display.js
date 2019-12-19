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
            var username = req.cookies['username'];
            res.render('display.ejs',{user,username});
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
var count = 0;

router.get('/search',(req,res)=>{
    count = 0;
    // console.log(count);
    res.render('search.ejs',{count});
});

// router.get('/search/results',(req,res)=>{
//     res.render('searchResults.ejs');
// });

router.post('/search',(req,res)=>{
    var searchEntry = req.body.search;
    // console.log(searchEntry);
    User.find({skill:searchEntry},(err,users)=>{
        // console.log(users);
        if(err)
        throw err;
        else if(users){
                count++;
                // console.log(count);
                res.render('search.ejs',{users,count});
            }
            else
                //console.log(count);
            res.send('no search matches');
        
    });
});

module.exports = router;