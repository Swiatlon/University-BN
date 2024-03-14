import "reflect-metadata";
import express from "express";
import studentRoutes from "./routes/studentRoutes";
import cors from "cors";
import corsOptions from "./configs/cors";
import errorHandler from "./middlewares/errorHandler";
import { AppDataSource } from "./configs/database";

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", studentRoutes);

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    console.log("Succesfully connected to DB!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error when connecting to database!");
    console.log(error);
  });

export default app;
