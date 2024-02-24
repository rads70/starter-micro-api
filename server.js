require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const helmet = require("helmet");
const mongoose = require("mongoose");
const path = require("path");
const { logError, returnError } = require("./middleware/errorHandler");
const connectDB = require("./config/db");

const app = express();
const logger = require("./config/logger");

//connectDB();
connectDB();

app.use(express.json());
app.use(
   cors({
      origin: "*",
      credentials: true,
   })
);
app.use(
   helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false })
);
//
require("./config/routes")(app);

app.get("/api", (req, res) => {
   res.send({ message: "Hello" });
});

process.on("uncaughtException", err => {
   logger.log(err.message);
   process.exit(1);
});

app.use(logError);
app.use(returnError);
const port = process.env.PORT || 9000;

app.listen(port, function () {
   logger.info(`Server listening on port ${port}`);
});
