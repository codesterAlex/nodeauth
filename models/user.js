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






UserSchema.statics.findByCredentials = function(username, password)
{
  var user = this;
  console.log('Enter the statics')
  return  db.findOne({username}).then((user) =>{
    if(!user)
    {
      return Promise.reject((new Error('fail')));
      console.log('user not found');
    }

    return new Promise((resolve, reject) =>{
      bcrypt.compare(password, user.password,(err, res)=>{
        if(res)
        {
          resolve(user);
          console.log('User found and password matched')
        }
        else{
          reject((new Error('fail')));
          console.log('Password not matched')
        }
      })
    })
  })
};



module.exports.createUser = (newUser,callback)=>{
  bcrypt.hash(newUser.password,10,(err, hash)=>{
    if(err) throw err;
    //set hashed pw
    newUser.password = hash;
    newUser.save(callback);
  })


};

var User = module.exports = mongoose.model('User', UserSchema);
