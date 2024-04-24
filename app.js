const CONFIG = require('./config/config')
const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const signup = require('./routes/signup')
const login = require('./controller/login')
const blog = require('./routes/blog')

const app = express()



// Parse information from request
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/signup', signup)
app.use('/api/login', login)
app.use('/api/blog', blog)

// Use error handler middleware
app.use(errorHandler)

module.exports = app