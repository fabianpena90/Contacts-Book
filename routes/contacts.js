const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator');

const User = require('../models/User')
const Contact = require('../models/Contact')


// @route GET api/contacts
// @desc get all user contacts
// @access private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({user: req.user.id}).sort({ date: -1})
    res.json(contacts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route POST api/contacts
// @desc add a contact
// @access private
router.post('/', [auth, [
  check('name', 'Name is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }
  const {name, email, phone, type} = req.body

  try {
    const newContact = new Contact({
      name,
      email, 
      type,
      phone,
      user: req.user.id
    })

    contact = await newContact.save()
    res.status(200).json(contact)
  }catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }

})

// @route PUT api/contacts/:id
// @desc update a contact
// @access private
router.put('/:id', auth, async (req, res) => {
  const {name, email, phone, type} = req.body

  // Build contact object
  const contactFields = {}
  if(name) contactFields.name
  if(email) contactFields.email
  if(phone) contactFields.phone
  if(type) contactFields.type

  try {
    let contact = await Contact.findById(req.params.id)
    if(!contact) return res.status(404).json({
      msg: 'Contact not found'
    })

    // Make sure user owns contact
    if(contact.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'No authorize'})
    }

    contact = await Contact.findByIdAndUpdate(req.params.id, 
      {$set: contactFields},
      { new: true})
      res.json(contact)
    
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route PUT api/contacts/:id
// @desc delete a contact
// @access private
router.delete('/', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id)
    if(!contact) return res.status(404).json({
      msg: 'Contact not found'
    })

    // Make sure user owns contact
    if(contact.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'No authorize'})
    }

    await Contact.findByIdAndRemove(req.params.id)
      res.json({ msg: 'Contact removed'})
    
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router;