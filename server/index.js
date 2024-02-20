require("dotenv").config();
require("./config/database").connectDB();
const express = require("express");
const userRoutes = require('./routes/users.route');
const stockRoutes = require('./routes/stocks.route');
const setupMiddlewares = require('./config/middleware');

//server constants
const app = express();
const port = process.env.PORT || 8000;

//middleware
setupMiddlewares(app);

//view engine
app.set("view engine", "ejs");

//routes
app.get("/", (req, res) => {
  res.render("index");
});

app.use('/users', userRoutes);

app.use('/stocks', stockRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});