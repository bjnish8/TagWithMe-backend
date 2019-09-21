const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET_KEY

const Auth = {
    async verifyToken(req, res, next) {
        const bearer = req.headers.authorization;
        if (bearer) // Bearer in format 'Bearer XXXX'
            token = bearer.split(" ")[1] // Remove the bearer and extract the token 'XXXX' only
        if (!token) {
            return res.status(401).json({
                error: {
                    message: "Credentials cpuld not be verified"
                }
            })
        }
        try {
            const decoded = await jwt.verify(token, jwtSecret); // Decoded contains the data initially put into the jwt at creation
            // Set the user object in res.locals to be accessed after the next() function
            res.locals.user = {
                _id: decoded._id,
                email: decoded.email
            }
            next();

        } catch (err) {
            return res.status(401).json({
                error: {
                    message: "Auth failed " + err
                }
            })
        }
    }
}

module.exports = Auth