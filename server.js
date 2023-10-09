import express from "express";
import dotenv from "dotenv";
import connnectDb from "./config/db.js";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";

// files
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

// conofig
dotenv.config();
connnectDb();
// rest object
const app = express();

// middleWares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/job", jobRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
