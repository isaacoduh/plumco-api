const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthenticated user!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized User!" });
  }
};

const authorize = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthenticated user!" });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        success: false,
        message:
          "Forbidden: You do not have permission to perform this action!",
      });
    }

    next();
  };
};

module.exports = { authMiddleware, authorize };
