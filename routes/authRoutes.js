import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { rateLimit } from "express-rate-limit";
import swaggerJSDoc from "swagger-jsdoc";

// IP LIMITER
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
});

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - username
 *        - lastName
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: string
 *          description: The Auto-generated id of user collection
 *          example : DHSASDHJDJHVAJDSVJAVSD
 *        username:
 *          type: string
 *          description: User name
 *        lastName:
 *          type: string
 *          description: User Last Name
 *        email:
 *          type: string
 *          description: user email address
 *        password:
 *          type: string
 *          description: user password should be greater then 6 character
 *        location:
 *          type: string
 *          description: user location city or country
 *      example:
 *        id: GDHJGD788BJBJ
 *        username: John
 *        lastName: Doe
 *        email: johndoes@gmail.com
 *        password: test@123
 *        location: mumbai
 */

/**
 *  @swagger
 *  tags:
 *    name: Auth
 *    description: authentication apis
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *    post:
 *      summary: register new user
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: user created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:
 *          description: internal serevr error
 */

router.post("/register", limiter, registerController);
/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: login page
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: login successfull
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: something went wrong
 */

router.post("/login", limiter, loginController);
// router.get("/profile", getProfile);
// router.get("/update-profile", updateProfile);

export default router;
