const router = require('express').Router();
const bcrypt = require('bcrypt-nodejs');
const multer = require('multer');
const path = require('path');
var User = require('../models/user.js');

//set storage engine
// const storage = multer.diskStorage({
//     destination : '../public/uploads/',
//     filename: function(req,file,cb){
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

//init upload
// const upload = multer({
//     storage : storage
// }).single('myImage');

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
    //console.log(name);
    var price = req.body.price;
    var skillArray = skill.split(',');
    var user = new User();
    user.username = username;
    user.password = password;
    user.name = name;
    user.email = email;
    user.phoneno = phoneno;
    user.github = github;
    user.linkedin = linkedin;
    user.skill = skillArray;
    user.price = price;
    user.totalAmount = 0;
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
    //checks if a cookie exists
    var username = req.cookies['username'];
    if(username){
        User.findOne({username:username},(err,user)=>{
            if(err)
            throw err;
            else{
                res.render('dashboard.ejs',{user});
            }
        });
    } else {
        res.send('login/signup first');
    }
});

router.get('/login',(req,res)=>{
    res.render('login.ejs');
});

router.post('/login',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username:username},(err,user)=>{
        if(err)
        throw err;
        else{
            if(!user){
                res.send('incorrect credentials');
            } else {
                if(bcrypt.compareSync(password,user.password)){
                    res.cookie('username',user.username,{maxAge: 900000, httpOnly: true});
                    if(user.totalAmount==="NaN"||!user.totalAmount){
                        user.totalAmount = 0;
                        user.save();
                    }
                    res.redirect('/home');
                }
                else{
                    res.send('incorrect password');
                }
            }
        }
    });
});

router.get('/logout',(req,res)=>{
    res.clearCookie('username');
    res.redirect('/');
})

module.exports = router;