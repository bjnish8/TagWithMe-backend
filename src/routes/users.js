const express = require('express')
const router = express.Router()
const users = require('../controllers/userController')
const validate = require('../validators/userValidator').validate

// app.post('/login', login-function)
router.post('/register', validate.registration, users.signUp)

module.exports = router