require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const authRouter = require("./routes/auth");

connectDB();

app.use(express.json());
app.use("/api/auth", authRouter);

const PORT = 5000 || process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log("error: ", err);
  server.close(() => process.exit(1));
});
