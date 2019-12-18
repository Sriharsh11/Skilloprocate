const router = require('express').Router();
var User = require('../models/user.js');

router.get('/',(req,res)=>{
    res.render('main.ejs');
});

router.get('/signup',(req,res)=>{
    res.render('signup.ejs');
});


router.post('/signup',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var email = req.body.email;
    var phoneno = req.body.phoneno;
    var github = req.body.github;
    var linkedin = req.body.linkedin;
    var skill = req.body.skill;
    var price = req.body.price;
    var user = new User();
    user.username = username;
    user.password = password;
    user.name = name;
    user.email = email;
    user.phoneno = phoneno;
    user.github = github;
    user.linkedin = linkedin;
    user.skill = skill;
    user.price = price;
    user.save((err,data)=>{
        if(err)                                                          
        throw err;
        else{
            res.cookie('username',data.username,{maxAge: 900000, httpOnly: true});
            res.redirect('/home');
        }
    })
})

router.get('/home',(req,res)=>{
    var username = req.cookies['username'];
    User.findOne({username:username},(err,user)=>{
        if(err)
        throw err;
        else{
            res.render('dashboard.ejs',{user});
        }
    })
})

router.get('/logout',(req,res)=>{
    res.clearCookie('username');
    res.redirect('/');
})

module.exports = router;