const roleMiddleware = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};

module.exports = (req, res, next) => {
    if (!req.user || (req.user.role !== "admin" || "seller")) {
      return res.status(403).json({ error: "Доступ запрещен" });
    }
    next();
  };
