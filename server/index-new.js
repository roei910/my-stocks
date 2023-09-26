//website for help with jwt token
//https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
require("dotenv").config();
require('./config/database').connectDB();
const express = require("express"); //run local server
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

//server constants
const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PATCH']
}));

// app.use(require('./config/middleware')); //not working yet

//view engine
app.set('view engine', 'ejs');

//importing db modules
const User = require('./models/user');
const Stock = require('./models/stock');

//constants
const stocks = [
  { id: 1, name: "Apple", symbol: "AAPL", price: "85.00" },
  { id: 2, name: "Taboola", symbol: "TBLA", price: "3.81" },
];

//routes
app.get("/", (req, res) => {
  // res.json(users);
  res.render('index');
});

//delete all users from db
app.delete("/users/all", (req, res) => {
  User.deleteMany({})
    .then((response) => console.log(response))
    .catch(err => console.log(err));
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

//users routes
app.post("/users/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.post("/users/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!(email && password && username)) {
      res.status(400).send("Missing input for user registration");
    }

    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      return res.status(409).send("User already registered");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      email: email.toLowerCase(),
      password: encryptedPassword
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    console.log(user);

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }

});

app.post('/users/authentication', function (req, res) {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  res.status(200).send("working");
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

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
