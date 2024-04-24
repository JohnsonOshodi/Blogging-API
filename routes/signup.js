const router = require('express').Router()
const { createUser } = require('../controller/user')

router.route('/').post(createUser)

module.exports = router