const express = require('express')
const router = express.Router();

// @route GET api/contacts
// @desc get all user contacts
// @access private
router.get('/', (req, res) => {
  res.send('Get all user')
})

// @route POST api/contacts
// @desc add a contact
// @access private
router.post('/', (req, res) => {
  res.send('Add new contact')
})

// @route PUT api/contacts/:id
// @desc update a contact
// @access private
router.put('/', (req, res) => {
  res.send('Update a contact')
})

// @route PUT api/contacts/:id
// @desc delete a contact
// @access private
router.delete('/', (req, res) => {
  res.send('delete a contact')
})

module.exports = router;