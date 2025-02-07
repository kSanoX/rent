const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const tokenValue = token.split(' ')[1]; // Проверяем, есть ли вторая часть после "Bearer"
        if (!tokenValue) {
            return res.status(401).json({ error: 'Malformed token' });
        }

        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded); // Логируем, что получилось

        if (!decoded.role) {
            return res.status(400).json({ error: 'Token does not contain role' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        console.error("Token verification error:", err.message);
        res.status(401).json({ error: 'Invalid token' });
    }
};

const verifyRole = (roles) => (req, res, next) => {
    console.log("User role:", req.user?.role); // Логируем роль пользователя

    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};

module.exports = { authMiddleware, verifyRole };
