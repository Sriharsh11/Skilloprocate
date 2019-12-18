const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/skilloprocate",(err)=>{
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