const express = require('express')
const router = express.Router();

// @route GET api/auth
// @desc get logged in user
// @access private
router.get('/', (req, res) => {
  res.send('Get a user')
})

// @route POST api/auth
// @desc loggin an user
// @access public
router.post('/', (req, res) => {
  res.send('loggin an user')
})

module.exports = router;