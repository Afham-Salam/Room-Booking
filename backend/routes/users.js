var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/all', async function(req, res) {
  const users = await User.find()

  console.log({users});
  
  


  res.json({users})
});

module.exports = router;
