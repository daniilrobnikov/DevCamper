const express = require('express')
const Bootcamp = require('../models/Bootcamp')
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps')

// Import middleware & Asign Permissions
const advancedResults = require('../middleware/advancedResults')
const { protect, authorize } = require('../middleware/auth')
// _____________________________________________________________
const router = express.Router()

// Re-route into other resource routers
const courseRouter = require('./courses')
router.use('/:bootcampId/courses', courseRouter)
const reviewRouter = require('./reviews')
router.use('/:bootcampId/reviews', reviewRouter)

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp)
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp)
router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload)
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

module.exports = router
