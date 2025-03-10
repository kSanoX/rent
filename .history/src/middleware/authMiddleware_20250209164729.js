const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const tokenValue = token.split(' ')[1]; // Извлекаем сам токен
        if (!tokenValue) {
            return res.status(401).json({ error: 'Malformed token' });
        }

        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);

        if (!decoded.role) {
            return res.status(400).json({ error: 'Token does not contain role' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

const verifyRole = (roles) => (req, res, next) => {
    console.log("User role:", req.user ? req.user.role : "No user");
    console.log("Allowed roles:", roles);

    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};

module.exports = { authMiddleware, verifyRole };
