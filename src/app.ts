import express, { Request, Response } from "express";
import cors from "cors";

import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFoundRouter from "./app/middleware/notFound";
import router from "./app/routes";
const app = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application Routes
app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res.send({ success: true, message: "Server is running" });
});

// Global Error Handler
app.use(globalErrorHandler);

// Handle not found
app.use(notFoundRouter);

export default app;
