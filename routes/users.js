const express = require('express')
const User = require('../models/User')
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users')

// Import middleware
const advancedResults = require('../middleware/advancedResults')
const { protect, authorize, admin } = require('../middleware/auth')
// ______________________________________________________________
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const router = express.Router()

router.use(protect)
router.use(authorize('admin'))

router.route('/').get(advancedResults(User), getUsers).post(createUser)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

module.exports = router
