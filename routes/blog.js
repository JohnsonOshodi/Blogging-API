const router = require('express').Router()
const { createBlog, getBlogs, getBlog, updateblog } = require('../controller/blog')
const { filterAndSort, filterByPublished, list, setUserFilter } = require('../middleware/apiFeatures')
const getUserFromToken = require('../middleware/verifyUsers')
const pagination = require('../middleware/pagination')
const { userSchema } = require('../controller/schema');
//const { cache } = require('joi')

// Middleware to validate the request body against the schema
function validateRequest(req, res, next) {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

// Define the the API endpoint
router.post('/blog', validateRequest, (req, res) => {

// Assuming the body is valid, handle the request here
res.status(200).json({message: 'Blog post created successfully', data: req.body });
});





router.route('/')
  .get(filterAndSort, filterByPublished, pagination, list, getBlogs)
  .post(getUserFromToken, createBlog)

router.route('/p')
  .get(getUserFromToken, filterAndSort, setUserFilter, pagination, getBlogs)

router.route('/:id').get(getBlog).patch(getUserFromToken, updateblog )

module.exports = router;