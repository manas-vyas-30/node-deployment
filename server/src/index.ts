import compression from "compression";
import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import fileRouter from "./routes/file.route";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());

/** Connect to MongoDB */

mongoose
  .connect(process.env.MONGO_URI || ``)
  .then(() => {
    console.log("MongoDB connection established successfully!");
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.set("returnOriginal", false);

app.use("/file", fileRouter);

/** Start the server */
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
