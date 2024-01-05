import jwt from 'jsonwebtoken'; // Import the jsonwebtoken module
const JWT_SECRET = 'd5rpmQYGtDcRhTLPJSe9AwzRuTEshJMB5SHdfkmcCAbPBVUf7g5daGTmyZq3kzSAnXzTwg2QF4rbWheEpaYnB8HUqSjwcTXvmuQxLZ5gG74aeD'
function auth(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token)
            return res.status(401).json({ errorMessage: "Unauthorized" });

        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified.user;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}

export default auth;
