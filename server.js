const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config({ path: './config/config.env' })
const colors = require('colors')
const morgan = require('morgan')
const hpp = require('hpp')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/error')

// Connect to MongoDB database
const connectDB = require('./config/db')
connectDB()

// Route files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')
const users = require('./routes/users')
const reviews = require('./routes/reviews')
// ______________________________________________________________
const app = express()
app.use(express.json())

// Addons to express: Security, file upload, etc.
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use(limiter)
app.use(cors())
app.use(xss())
app.use(hpp())
app.use(helmet())
app.use(fileupload())
app.use(cookieParser())
app.use(mongoSanitize())
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
// Set static folder
app.use(express.static(path.join(__dirname, 'public')))
// ______________________________________________________________
// Mount routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/reviews', reviews)

app.use(errorHandler)

// ______________________________________________________________
// Start server
const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.underline.bold)
  // Close server & exit process
  server.close(() => process.exit(1))
})
