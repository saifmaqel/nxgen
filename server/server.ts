import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import deviceRoutes from "./routes/deviceRoutes.ts";
import deviceTempRoutes from "./routes/deviceTempRoutes.ts";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

export const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/devices", deviceRoutes);
app.use("/devices", deviceTempRoutes);

app.listen(port, () => {
  console.log("Server has started on port", port);
});

// add readme file
// seed database on build
// make sure you have docker container running
// deploy to rendrer
