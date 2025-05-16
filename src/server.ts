/* eslint-disable no-console */
import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
import { Server } from "http";
import seedSuperAdmin from "./app/DB";
let server: Server;
async function main() {
  try {
    if (config.database_url) {
      await mongoose.connect(config.database_url);
      console.log("Connected to MongoDB");
      seedSuperAdmin();
    }
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main();

process.on("unhandledRejection", (error) => {
  console.error("😡 Unhandled Rejection:", error);
  if (server) {
    server.close(() => {
      process.exit();
    });
  }
  process.exit();
});

process.on("uncaughtException", () => {
  console.log("😡 Uncaught Exception");
  process.exit();
});
