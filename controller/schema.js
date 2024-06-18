const Joi = require('joi');

const userSchema = Joi.object({
    firstname: Joi.string().min(2).max(50).required().messages({
        'string empthy': 'First name is required',
        'string min': 'First name must be atlest 2 characters long',
        'string max': 'First name must not be less than 50 characters long',
      }),
      lastname: Joi.string().min(2).max(50).required().messages({
          'string empthy': 'Lastname is required',
          'string min': 'Lastname must be atlest 2 characters long',
          'string max': 'Lastname must not be less than 50 characters long',
      }),
      username: Joi.string().alphanum().min(3).max(30).required().messages({
          'string empthy': 'Username is required',
          'string min': 'Username must only contain alphabets and numbers',
          'string max': 'Username must not be less than 30 characters long',
      }),
      email: Joi.string().min(2).max(50).required().messages({
          'string empthy': 'Email is required',
          'string email': 'Email must be a valid email address',
      }),
      password: Joi.string().min(6).max(30).required().messages({
          'string empthy': 'Password is required',
          'string min': 'Password must be atleast 6 characters long',
          'string max': 'Password must be less than 30 characters long', 
      }),
      article: Joi.object({
        title: Joi.string().min(3).max(100).required().messages({
            'string empthy': 'Title is required',
            'string min': 'Title must be atleast 3 characters long',
            'string max': 'Password must be less than 100 characters long',
        }),
      })
    
});
  

module.exports = {
    userSchema,
};