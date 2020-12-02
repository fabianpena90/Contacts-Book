const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator');
const User = require('../models/User')

// @route POST api/users
// @desc register a user
// @access public
router.post('/', [
  check('name', 'name is required').not().isEmpty(),
  check('email', 'email is required').isEmail(),
  check('password', 'Password is required and the minimum length is 6').isLength({ min: 6 })
  ], async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }

  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if(user) {
      return res.status(400).json({msg: 'User already exists'})
    }

    user = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt)

    await user.save()

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

  } catch(err) {
    console.error(err.message)
    res.status(500).send('server error brah')
  }
})

module.exports = router;