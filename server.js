import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
// Security Packages
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
// API Documentation
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";

// files import
import connnectDb from "./config/db.js";
// Routes Import
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

// config
dotenv.config();
connnectDb();

// Swagger Api config
// Swagger Api options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      tittle: "job Portal Application",
      desciption: "Node Expressjs Job Portal Application",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);

// rest object
const app = express();

// middleWares
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/job", jobRoutes);
app.use(errorMiddleware);

// homeroute Root
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
