const router = require('express').Router();
var User = require('../models/user.js');

router.get('/ratings/:id',(req,res)=>{
    User.findOne({_id:req.params.id},(err,user)=>{
        if(err)
        throw err;
        else{
            res.render('ratings.ejs',{user});
        }
    })
});

router.post('/ratings/:id',(req,res)=>{
    var rating = req.body.rating;
    User.findOne({_id:req.params.id},(err,user)=>{
        if(err)
        throw err;
        else{
            user.rating.push(rating);
            user.save((err)=>{
                if(err)
                throw err;
                else {
                    var arr = user.rating;
                    var sum = 0;
                    for(var i = 0; i < arr.length; i++){
                        sum = sum + parseInt(arr[i]);
                    }
                    var avg = sum/(arr.length) ;
                    user.avgRating = Math.round(avg * 100) / 100 ;
                    user.save((err)=>{
                        if(err)
                        throw err;
                        else{
                            res.redirect('/display');
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;