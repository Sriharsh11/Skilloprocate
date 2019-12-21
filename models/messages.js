const mongoose = require('mongoose');

mongoose.connect("mongodb://Sriharsh11:marcoreus11@ds121950.mlab.com:21950/skilloprocate",(err)=>{
    if(err){
        throw err;
    } else {
        console.log('connected to messages');
    }
});

var Schema = mongoose.Schema;

var messages = mongoose.Schema({
    name : {
        type : String
    },
    message : {
        type : String
    }
});

module.exports = mongoose.model('Message',messages);