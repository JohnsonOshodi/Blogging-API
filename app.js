const CONFIG = require('./config/config')
const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const signup = require('./routes/signup')
const login = require('./controller/login')
const blog = require('./routes/blog')
const joi = require('joi')
const router = require('./routes/blog')
const  schema = require('./controller/schema');
const app = express();

const validateRequest = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({
          status: 'error',
          message: error.details.map(detail => detail.message).join(', '),
        });
      }
      next();
    };
  };

  console.log(CONFIG.DATABASE_CONNECT_STRING)
  // connect to db
  require('./db/db')(CONFIG.DATABASE_CONNECT_STRING)


app.use('/api/signup', validateRequest(schema), signup)

// Use the blog routes
app.use('/api', router);

// Parse information from request
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/signup', validateRequest(schema), signup)
app.use('/api/login', login)
app.use('/api/blog', blog)

// Use error handler middleware
app.use(errorHandler)

module.exports = app

