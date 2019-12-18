const router = require('express').Router();
const secret = require('../config/secret.js');
const keyPublishable = secret.keyPublishable;
const keySecret = secret.keySecret;
const User = require('../models/user.js');

const stripe = require("stripe")(keySecret);

router.get('/charge/:id',(req,res)=>{
    User.findOne({_id:req.params.id},(err,user)=>{
        if(err)
        throw err;
        else{
            res.render('index.ejs',{user});
        }
    });
});

router.post("/charge/:id", function(req, res) {
    User.findOne({_id:req.params.id},(err,user)=>{
        if(err)
        throw err;
        else{
            let amount = user.price; // 500 cents means $5 
 
            // create a customer 
            stripe.customers.create({
                email: req.body.stripeEmail, // customer email, which user need to enter while making payment
                source: req.body.stripeToken // token for the given card 
            })
            .then(customer =>
                stripe.charges.create({ // charge the customer
                amount,
                description: "Sample Charge",
                    currency: "inr",
                    customer: customer.id
                }))
            .then(charge => res.render("charge.ejs")); // render the charge view: views/charge.pug
            }
        });
    });

    module.exports = router;