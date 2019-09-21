// User registration
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoose = require('mongoose');

const User = require('../models/user');

const signUp = async function (req, res) {
    try {
        // Hash the password using bcrypt
        const hashed_pass = await bcrypt.hash(req.body.password1, saltRounds);

        // Insert the user info into the database

        /*
                    <---------- Here ----------> 
        */
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
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

module.exports = {
    signUp
}