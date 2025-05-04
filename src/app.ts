import express, { Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";
import { UserRoutes } from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFoundRouter from "./app/middleware/notFound";
const app = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application Routes
app.use("/api/v1/student", StudentRoutes);
app.use("/api/v1/user", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({ success: true, message: "Server is running" });
});

// Global Error Handler
app.use(globalErrorHandler);

// Handle not found
app.use(notFoundRouter);

export default app;
