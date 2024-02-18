require("dotenv").config();
require("./config/database").connectDB();
const express = require("express"); //run local server
const cors = require("cors");
const axios = require("axios");
const userRoutes = require('./routes/users.route');
const stockRoutes = require('./routes/stocks.route');

//server constants
const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PATCH"],
  })
);

//view engine
app.set("view engine", "ejs");

//routes
app.get("/", (req, res) => {
  res.render("index");
});

app.use('/users', userRoutes);

app.use('/symbols', stockRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});