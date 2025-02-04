// loas all environment variable from .env
require("dotenv").config();
//require express
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// connect to db
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database."));

//set up our server to accpet JSON
app.use(express.json());

//set up our routes
const houseworkRouter = require("./routes/housework");
//use route
app.use("/housework", houseworkRouter);

app.listen(3000, () => console.log("Server started"));

app.get("/", (req, res) => {
  res.send("Welcome to the Housework API!");
});
