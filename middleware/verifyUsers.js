const User = require('../model/User')
const jwt = require('jsonwebtoken')
const {promisify} =require('util')

module.exports = async (req, res, next) => {
  try {


    // Get bearer token from header
    const authorization = req.get('authorization')
    if (!(authorization && authorization.toLowerCase().startsWith('bearer'))) {
      throw new Error()
    }
    const bearerToken = authorization.substring(7)
   

    // Decode bearer token
    const userFromToken = await promisify (jwt.verify)(bearerToken, process.env.JWT_SECRET_KEY)
    
    const user = await User.findById(userFromToken.id)
    if (!user) {
      throw new Error()
    }

    

    // Add user to request object
    req.user = user
    next()
  } catch (err) {
    err.source = 'jwt middleware error'
    next(err)
  }
}