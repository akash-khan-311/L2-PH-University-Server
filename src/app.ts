import express, { Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";
const app = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application Routes
app.use("/api/v1/student", StudentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! " + name);
});

export default app;
