var express = require('express');
const { body } = require('express-validator/check');
var router = express.Router();
var _ = require('lodash');
var User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*Register*/
router.get('/register', (req, res,next)=>{
  res.render('register',{
    'title':'Register'
  });
});

/*Login*/
router.get('/login', (req, res,next)=>{
  res.render('login',{
    'title':'login'
  });
});
//
// router.post('/login',(req,res, next) =>{
//   res.send('<h1>working here</h1>');
// })

router.post('/login', async(req, res)=>{
      const body = _.pick(req.body,['username','password']);
  try{
    const user = await User.findByCredentials(body.email, body.password);
    console.log(user);
    res.location('/');
    res.redirect('/');
  }
  catch(e)
  {
    res.status(400).send(e);
  }
})

router.post('/register',(req, res, next)=>{
  //Get values form values

  var name  = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  //Check for Image Field
  if(req.files.profileimage)
  {
    console.log('Uploading File...');

    //File Info
    var profileImageOriginalName      =req.files.profileimage.profileImageOriginalName;
    var profileImageName              =req.files.profileimage.name;
    var profileImageMime              =req.files.profileimage.mimeType;
    var profileImagePath              =req.files.profileimage.path;
    var profileImageExt               =req.files.profileimage.extension;
    var profileImageSize              =req.files.profileimage.size;
  }
  else{
    //Set a Default Image
    var profileImageName = 'noImage.png';
  }
    //Form Validation
    req.checkBody('name','Name Field is required').notEmpty();
    req.checkBody('email','Email Field is required').notEmpty();
    req.checkBody('email','Email not valid').isEmail();
    req.checkBody('username','username Field is required').notEmpty();
    req.checkBody('password','Password Field is required').notEmpty();
    req.checkBody('password2','Password do not match').equals(req.body.password);
    //Check for errors
    var errors = req.validationErrors();
    if(errors)
    {
      res.render('register',{
        errors:errors,
        name,
        email,
        username,
        password,
        password2
      });
    }else{
      var newUser = new User({
        name,
        email,
        username,
        password,
        profileimage: profileImageName
      });

      // Create username
      User.createUser(newUser, (err, user)=>{
        if(err) throw err;
        console.log(user);
      });
      req.flash('Suceesss', 'You are now registered and you may log in');

      res.location('/');
      res.redirect('/');
    }
});

module.exports = router;
