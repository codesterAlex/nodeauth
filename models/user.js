var mongoose = require('mongoose');
var database = mongoose.connect('mongodb://localhost:27017/nodeauth',{useNewUrlParser:true});
var bcrypt = require('bcrypt');
var db = mongoose.connection;

//User Schema
var UserSchema = mongoose.Schema({
  username:{
    type:String,
    index: true
  },
  password:{
    type:String,
    required:true,
    bcrypt:true
  },
  email:{
    type:String
  },
  name:{
    type:String
  },
  profileimage:{
    type:String
  }
});


var User = module.exports = mongoose.model('User', UserSchema);


module.exports.createUser = (newUser,callback)=>{
  bcrypt.hash(newUser.password,10,(err, hash){
    if(err) throw err;
    //set hashed pw
    newUser.password = hash;
    newUser.save(callback);
  })


};
