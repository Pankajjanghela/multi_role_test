// if the user is authenticated then in ony allow to access those routes
const jwt = require("jsonwebtoken"); // validate the token


const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.header.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No Token, authorization denied" });
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            console.log("the decoded user is: ", req.user);
            next();
        } catch (err) {
            res.status(400).json({ message: "Token is not valid" });
        }
    }

};
module.exports = verifyToken;