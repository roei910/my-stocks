const express = require("express"); //run local server
const axios = require("axios"); //remote rest-api
const mongoose = require("mongoose"); //mongodb
const ejs = require("ejs"); //render client pages

//server constants
const app = express();
const port = 8000;

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//constants
const users = [];
const stocks = [
  { id: 1, name: "Apple", symbol: "AAPL", price: "85.00" },
  { id: 2, name: "Taboola", symbol: "TBLA", price: "3.81" },
];

//functions
function userExists(newUser) {
  const found = users.find((user) => user.name === newUser.name);
  if (found !== undefined) return true;
  return false;
}

//routes
app.get("/", (req, res) => {
  res.json(users);
});

//users routes
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.json(users[userId]);
});

app.patch("/users/:id/:symbol", (req, res) => {
  const userId = req.params.id;
  const stockSymbol = req.params.symbol;
  const found = users[userId].stockSymbols.find(
    (symbol) => stockSymbol === symbol
  );
  if (!found) {
    users[userId].stockSymbols.push(stockSymbol);
    res.json({ message: "stock symbol was successfully added to your list" });
  }
  res.json({ message: "stock symbol was already in your list" });
});

app.post("/users/register", (req, res) => {
  const user = {
    name: req.body.name,
    password: req.body.password,
    stockSymbols: [],
  };

  if (userExists(user)) {
    res.json({ message: "user already exists" });
  } else {
    users.push(user);
    res.json({ message: "new user created" });
  }
});

app.delete("/users/all", (req, res) => {
  users.splice(0, users.length);
  res.json({ message: "all users deleted" });
});

//stocks route
app.get("/stocks/all", (req, res) => {
  res.json({ stocks: stocks });
});

app.get('/stocks/:symbol', (req, res) => {
    const stockSymbol = req.params.symbol;
    res.json({ stock: stocks.find((stk) => stk.symbol === stockSymbol) });
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
