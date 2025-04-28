import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

// getting-started.js

async function main() {
  try {
    if (config.database_url) {
      await mongoose.connect(config.database_url);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }

  console.log("Connected to MongoDB");
}

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});

main();
