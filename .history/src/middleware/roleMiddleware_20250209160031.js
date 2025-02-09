const roleMiddleware = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};

const { verifyRole } = require("./middlewares/authMiddleware"); 
app.post("/api/cards", authMiddleware, verifyRole(["admin", "seller"]), createCard);

