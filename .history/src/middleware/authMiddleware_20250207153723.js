const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const tokenValue = token.split(' ')[1]; // Извлекаем сам токен
        if (!tokenValue) {
            console.log("Malformed token");
            return res.status(401).json({ error: 'Malformed token' });
        }

        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded); // Посмотрим, что в токене

        if (!decoded.role) {
            console.log("Token does not contain role!");
            return res.status(400).json({ error: 'Token does not contain role' });
        }

        req.user = decoded;
        console.log("User after decoding:", req.user);
        next();
    } catch (err) {
        console.error("Token verification error:", err.message);
        res.status(401).json({ error: 'Invalid token' });
    }
};


const verifyRole = (roles) => (req, res, next) => {
    console.log("User role in verifyRole:", req.user?.role);
    console.log("Allowed roles:", roles);

    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};

module.exports = { authMiddleware, verifyRole };
