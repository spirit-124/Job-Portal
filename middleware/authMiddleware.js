import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const authMiddleware = async (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      const decoded = jwt.verify(token, secret);
      console.log(decoded);
      req.user = { userId: decoded.userId };
    }
    next();
  } catch (error) {
    console.log(error);
    next("Auth Failed");
  }
};

export default authMiddleware;
