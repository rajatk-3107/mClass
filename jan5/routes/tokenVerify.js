const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (!req.headers.token) {
        res.json({
            success: false,
            msg: "Unauthorized request"
        })
    } else {
        jwt.verify(req.headers.token, req.app.get('key'), (err, decoded) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Authorization error"
                })
            } else {
                console.log(decoded)
                req.decoded = decoded;
                next();
            }
        })
    }
}