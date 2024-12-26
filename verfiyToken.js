const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return res.status(401).json({ message: "You are not logged in" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message: "Token invalid" });
        req.user = user;
        console.log(req.user)
        next();
    })
}

module.exports = verifyToken;