const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

mongoose.connect("mongodb://Sriharsh11:marcoreus11@ds121950.mlab.com:21950/skilloprocate",(err)=>{
    if(err){
        throw err;
    } else {
        console.log('connected to database');
    }
});

var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
      type : String,
      required : true
    },
    email : {
      type : String,
      required : true
    },
    phoneno : {
      type : String,
      required : true
    },
    github : {
      type : String
    },
    linkedin : {
      type : String
    },
    skill : {
      type : [String]
    },
    price : {
      type : String
    },
    rating : {
      type : Array
    },
    latitude : {
      type : String
    },
    longitude : {
      type : String
    },
    totalAmount : {
      type : String
    },
    avgRating : {
      type : String
    }
});

UserSchema.pre('save',function(next) {
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10, (err,salt) => {
      if(err) return next(err);
      bcrypt.hash(user.password, salt, null, (err,hash) => {
        if(err) return next(err);
        user.password = hash;
        next();
      });
    });
  });
  //compare passswords in the database and the one that the user types in
  UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }

module.exports = mongoose.model('User',UserSchema);