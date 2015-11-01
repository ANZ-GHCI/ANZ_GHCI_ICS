var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('About to render html5%%%%%%%%%%%%%%%%%%%%%%%%%');
  //res.render('login', { title: 'login.jade' });
  res.render('login');
});

module.exports = router;
