require("dotenv").config();
const express = require("express"); //run local server
const axios = require("axios"); //send requests to rest-api
const mongoose = require("mongoose"); //mongodb
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreatePlugin = require('mongoose-findorcreate');

//server constants
const app = express();
const port = 8000;

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //reading json from body
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//view engine
app.set('view engine', 'ejs');

//setting up express session
app.use(session({
  secret: process.env.SECRET,
  // secret: "ILOVESecrets",
  resave: false,
  saveUninitialized: false
}));

//passport initialization
app.use(passport.initialize());
app.use(passport.session());

//access to mongodb server with credentials
const dbName = "myBrokerDB";
const userName = process.env.USERNAME;
const userPassword = process.env.PASSWORD;
// const userName = "roei910";
// const userPassword = "r0545704382d";
const url = `mongodb+srv://${userName}:${userPassword}@cluster0.n538fdr.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(url);

//mongodb models
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
  stocks: [String]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreatePlugin);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

//constants
const users = [
  { id: 1, name: 'Roei', email: 'roei@gmail.com', password: '123456789', stocks: [] },
  { id: 2, name: 'Lital', email: 'litalalta@gmail.com', password: '123456789', stocks: [] }
];
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
  // res.json(users);
  res.render('index');
});

//users routes
app.get("/users/all", (req, res) => {
  res.json(users);
});

app.delete("/users/all", (req, res) => {
  users.splice(0, users.length);
  //delete all users from db
  // User.deleteMany({username: 'roei910'})
  // .then((response) => console.log(response))
  // .catch(err => console.log(err));
  res.json({ message: "all users deleted" });
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

//stocks route
app.get("/stocks/all", (req, res) => {
  res.json({ stocks: stocks });
});

app.get('/stocks/symbol/:symbol', (req, res) => {
  const stockSymbol = req.params.symbol;
  res.json({ stock: stocks.find((stk) => stk.symbol === stockSymbol) });
})

app.get('/stocks/name/:name', (req, res) => {
  const stockName = req.params.name;
  const found = stocks.filter((stk) => stk.name.toLowerCase().includes(stockName.toLowerCase()));
  res.json({ stocks: found });
})

app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, (err) => {
    if (err) {
      res.json(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        // res.sendStatus(200);
        res.json(req.sessionStore);

        // res.send(res.cookie);
      });
    }
  })
});

app.post("/register", (req, res) => {
  User.register({ username: req.body.username }, req.body.password)
    .then((user) => {
      passport.authenticate("local")(req, res, () => {
        res.json({ user: user })
      });
    })
    .catch(err => {
      res.json(err);
    })
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    res.json({ error: err });
  });
  res.sendStatus(200);
});


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
