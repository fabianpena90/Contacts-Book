const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator');
const User = require('../models/User')

// @route GET api/auth
// @desc get logged in user
// @access private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route POST api/auth
// @desc loggin an user
// @access public
router.post('/',[
  check('email', 'email is required').isEmail(),
  check('password', 'password is required').exists()
],
  async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }

    const { email, password} = req.body

    try {
      let user = await User.findOne({ email: email})
      if(!user) {
        res.status(400).json({ msg: 'Invalid credentials'})
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch) {
        return res.status(400).json({msg: 'Invalid credentials'})
      }

      const payload = {
        user: {
          id: user.id
        }
      }
  
      jwt.sign(payload, config.get('jwtsecret'), {
        expiresIn: 3600
      }, (err, token) => {
        if(err) {
          throw err
        } else {
          res.json({ token })
        }
      })

    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error: ' + err.message)
    }
  }
)

module.exports = router;