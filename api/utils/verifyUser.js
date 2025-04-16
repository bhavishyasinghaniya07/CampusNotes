import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    let token;

    // Check token from cookies
    if (req.cookies && req.cookies.access_token) {
      token = req.cookies.access_token;
    }

    // Check token from Authorization header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("Token received:", token);

    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "No token provided" });
    }

    // Verify token using JWT_SECRET (from .env file)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user details to the request object
    next(); // Proceed to the next middleware (route handler)
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized", error });
  }
};
