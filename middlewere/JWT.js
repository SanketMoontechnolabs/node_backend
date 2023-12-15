const jwt = require("jsonwebtoken");

async function AuthenticateToken(req, res, next) {

  try {
      const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        error: "Authentication required",
      });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          console.log("JWT Verification Error:", err.message);
          return res.json({
            statusCode: 403,
            msg: "Could not verify token",
            error: err.message,
          });
        } else {
          req.user = user;
          next();
        }
      });
    }
  } catch (err) {
    return res.json({
      statusCode: 401,
      msg: "Authentication Failed",
      error: err.message,
    });
  }
 
}

module.exports = AuthenticateToken;
