require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.URL_FRONT,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// connection database

require("./models/associations");
if (process.env.SYNC_DB) require("./models/index");

// routes
require("./routes/index")(app);

module.exports = app;
