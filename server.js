const express = require("express");
const bodyParser = require("body-parser");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");

const routesV1 = require("./api/v1/routes");
const { port } = require("./config/config");

const api = express();

// Standard Middleware
api.use(bodyParser.json());
api.use(
  bodyParser.urlencoded({
    extended: true
  })
);
api.use(cors());
api.use(morgan("combined"));

// Routes
api.use("/api/v1", routesV1);

api.listen(port, () => {
  console.log(`API is listening on port ${port}...`.bgMagenta);
});
