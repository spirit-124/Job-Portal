import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const secret = process.env.JWT_SECRET;
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    if (token) {
      const decoded = jwt.verify(token, secret);
      console.log(decoded);
      req.body._id = decoded?.id;
    }
    next();
  } catch (error) {
    next("Auth Failed");
  }
};

export default authMiddleware;
