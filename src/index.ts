import dotenv from "dotenv";
dotenv.config();
import express from "express";
import studentRoutes from "./routes/studentRoutes";
import cors from "cors";
import corsOptions from "./configs/cors";
import errorHandler from "./middlewares/errorHandler";

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", studentRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
