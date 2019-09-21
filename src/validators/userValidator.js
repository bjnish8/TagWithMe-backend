const User = require('../models/user');

const validate = {
    async registration(req, res, next) {
        let email_regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        // Check if none of the required fields are empty
        if (!req.body.email || !req.body.password1 || !req.body.password2 || !req.body.first_name || !req.body.last_name) {
            return res.status(400).json(({
                error: {
                    message: "Please fill out all the fields"
                }
            }))
        }
        // Check if password and verify_password fields match
        else if (req.body.password1 !== req.body.password2) {
            return res.status(400).json({
                error: {
                    message: "Passwords do not match"
                }
            })
        }

        // Use regex to check if email provided is a valid email
        else if (!email_regex.test(req.body.email.toLowerCase())) {
            return res.status(400).json({
                error: {
                    message: "Please provide a valid email address"
                }
            })
        } else {
            // Last, check if the email pre-exists in the database
            const user = await User.find({
                email: req.body.email.toLowerCase()
            }).exec()

            if (user.length === 0) { // If no users exist already
                next();
            } else {
                return res.status(400).json({
                    error: {
                        message: "User with that email address already exists. Please provide a different email"
                    }
                })
            }
        }
    },
    async login(req, res, next) {
        const user = await User.find({
            email: req.body.email.toLowerCase()
        }).exec()

        if (user.length === 0) { // If no users exist already
            return res.status(400).json({
                error: {
                    message: "Email address does not exist. Please recheck email address"
                }
            })

        } else {
            res.locals.user = user[0]; // Set the user object in res.locals to be accessed after the next() function
            next();
        }
    }
}

module.exports = {
    validate
}