const express = require('express')
const router = express.Router()
const users = require('../controllers/userController')
const validate = require('../validators/userValidator').validate

router.post('/register', validate.registration, users.signUp)
router.post('/login', validate.login, users.login)

module.exports = router