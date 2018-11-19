var express = require('express');
var router = express.Router();

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


module.exports = router;
