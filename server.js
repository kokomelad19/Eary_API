// Config ENV variables
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥", err);
});

const app = require("./app");

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥", err);
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});

app.listen(5000, () => console.log("Server is running on port 5000 ..."));
