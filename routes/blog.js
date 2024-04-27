const router = require('express').Router()
const { createBlog, getBlogs, getBlog, updateblog } = require('../controller/blog')
const { filterAndSort, filterByPublished, list, setUserFilter } = require('../middleware/apiFeatures')
const getUserFromToken = require('../middleware/verifyUsers')
const pagination = require('../middleware/pagination')

router.route('/')
  .get(filterAndSort, filterByPublished, pagination, list, getBlogs)
  .post(getUserFromToken, createBlog)

router.route('/p')
  .get(getUserFromToken, filterAndSort, setUserFilter, pagination, getBlogs)

router.route('/:id').get(getBlog).patch(getUserFromToken, updateblog )

module.exports = router