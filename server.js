// Config ENV variables
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = require("./app");
const databaseConnection = require("./database/connection");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥", err);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥", err);
});

// Sync Database Tables
databaseConnection
  .syncTables(
    process.env.DROP_TABLES ? process.env.DROP_TABLES.trim() === "true" : false
  )
  .then(() => {
    console.log("Database Synced successfully 🚀");
  })
  .catch((err) => {
    console.log("Error while connecting database ", err);
  });

// start server
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT} ...`)
);
