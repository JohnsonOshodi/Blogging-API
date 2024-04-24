const User = require('../model/User')

const createUser = async (req, res, next) => {
  try {


    // Grab details from the request
    const { firstName, lastName, username, email, password } = req.body


    // Create user object
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    })


    // Save to database
    const createdUser = await newUser.save()

    
    // Return response
    return res.status(201).json({
      status: true,
      data: createdUser,
    })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  createUser,
}