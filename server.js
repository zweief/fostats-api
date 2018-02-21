const express = require("express");
const bodyParser = require("body-parser");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./api/v1/auth");
const userRoutes = require("./api/v1/user");

const { port, loggerFormat } = require("./config/config");

const api = express();

require("./passport");

// Standard Middleware
api.use(bodyParser.json());
api.use(
  bodyParser.urlencoded({
    extended: true
  })
);
api.use(cors());
if (process.env.NODE_ENV !== "test") {
  api.use(morgan(loggerFormat));
}

// Routes
api.use("/api/v1", authRoutes);
api.use("/api/v1", userRoutes);

// 404 Error
api.use((req, res, next) => {
  const err = new Error("Not Found.");
  err.status = 404;
  next(err);
});

// Error Handler
api.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message || "Internal Server Error."
    }
  });
});

api.listen(port, () => {
  console.log(`API is listening on port ${port}...`.bgMagenta);
});

module.exports = api;
