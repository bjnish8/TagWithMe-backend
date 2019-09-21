const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const jwtSecret = process.env.JWT_SECRET_KEY;
// User registration
const signUp = async function (req, res) {
    try {
        // Hash the password using bcrypt
        const hashed_pass = await bcrypt.hash(req.body.password1, saltRounds);

        // Insert the user info into the database
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email.toLowerCase(),
            password: hashed_pass,
            first_name: req.body.first_name,
            last_name: req.body.last_name
        })
        result = await user.save()
        return res.status(201).json({
            success: {
                message: "User registration was successful"
            }
        })

    } catch (e) {
        return res.status(400).json({
            error: {
                message: e
            }
        })

    }
}

// User login
const login = async function (req, res) {
    try {
        result = await bcrypt.compare(req.body.password, res.locals.user.password) // res.locals.user contains the user object from the validator middleware

        if (result === true) {
            const token = jwt.sign({
                    email: res.locals.user.email,
                    _id: res.locals.user._id
                },
                jwtSecret, {
                    expiresIn: '1h'
                })

            return res.status(200).json({
                success: {
                    message: "Successfully logged in",
                    token: token
                }
            })
        } else {
            return res.status(401).json({
                error: {
                    message: "User authentication failed. Invalid password"
                }
            })
        }
    } catch (e) {
        return res.status(400).json({
            error: {
                message: e
            }
        })

    }
}
module.exports = {
    signUp,
    login
}