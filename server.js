import express from "express";
import dotenv from "dotenv";
import connnectDb from "./config/db.js";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";

// files
import testRoutes from "./routes/testRoutes.js";

// conofig
dotenv.config();
connnectDb();
// rest object
const app = express();

// middleWares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("<h1>Test Route</h1>");
});
app.use("/api/v1", testRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
