//website for help with jwt token
//https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
require("dotenv").config();
require("./config/database").connectDB();
const express = require("express"); //run local server
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const axios = require("axios");

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

// app.use(require('./config/middleware')); //not working yet

//view engine
app.set("view engine", "ejs");

//importing db modules
const User = require("./models/user");
const Stock = require("./models/stock");

//constants
const stocks = [
  { id: 1, name: "Apple", symbol: "AAPL", price: "85.00" },
  { id: 2, name: "Taboola", symbol: "TBLA", price: "3.81" },
];

//routes
app.get("/", (req, res) => {
  res.render("index");
});

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
      return res.status(400).send("Missing input for user registration");
    }

    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      return res.status(409).send("User already registered");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      email: email.toLowerCase(),
      password: encryptedPassword,
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

    // return new user
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

//run every request to check user token for authentication
app.use((req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token)
    return res.status(403).send("A token is required for authentication");

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  next();
});

//delete all users from db
app.delete("/users/all", (req, res) => {
  // User.deleteMany({})
  //   .then((response) => console.log(response))
  //   .catch(err => console.log(err));
});

//stocks route
app.get("/stocks/all", (req, res) => {
  // Stock.find({})
  //   .then((result) => {
  //     res.json({ stocks: result });
  //   })
  //   .catch(err => res.statusCode(400));
  User.findOne({ _id: req.user.user_id })
    .then((result) => {
      console.log(result);
      res.json({ stocks: result.stocks, email: result.email });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get("/stocks/symbol/:symbol", (req, res) => {
  const stockSymbol = req.params.symbol;
  Stock.findOne({ symbol: stockSymbol }).then((found) => {
    if (!found) {
      getStockDataBySymbol(stockSymbol);
      getStockNameBySymbol(stockSymbol);
      //create a new stock object and save to mongo db using mongoose
    }
  });
  res.json({ stock: stocks.find((stk) => stk.symbol === stockSymbol) });
});

app.get("/stocks/name/:name", (req, res) => {
  const stockName = req.params.name;

  const options = {
    method: "GET",
    url: "https://alpha-vantage.p.rapidapi.com/query",
    params: {
      keywords: stockName,
      function: "SYMBOL_SEARCH",
      datatype: "json",
    },
    headers: {
      "X-RapidAPI-Key": "3cfd02f090msh4bd229c6a961da5p100578jsne25c8024ccee",
      "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.status(200).json(response.data.bestMatches);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post("/users/authentication", function (req, res) {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    res.sendStatus(200);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
});

app.patch("/users/:symbol", (req, res) => {
  const stockSymbol = req.params.symbol;
  User.findOne({ _id: req.user.user_id })
    .then((result) => {
      console.log(result);
      if (
        result.stocks.find((element) => element === stockSymbol) !== undefined
      ) {
        res.json({ message: "stock symbol already exists" });
      } else {
        result.stocks = [...result.stocks, stockSymbol];
        result
          .save()
          .then(() => res.json({ message: "stock symbol was successfully" }))
          .catch(() => res.json({ message: "error saving stock symbol" }));
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

function getStockNameBySymbol(stockSymbol) {
  const options = {
    method: "GET",
    url: "https://twelve-data1.p.rapidapi.com/stocks",
    params: {
      exchange: "NASDAQ",
      symbol: stockSymbol,
      format: "json",
    },
    headers: {
      "X-RapidAPI-Key": "3cfd02f090msh4bd229c6a961da5p100578jsne25c8024ccee",
      "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getStockDataBySymbol(stockSymbol) {
  const options = {
    method: "GET",
    url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${stockSymbol}/financial-data`,
    headers: {
      "X-RapidAPI-Key": "3cfd02f090msh4bd229c6a961da5p100578jsne25c8024ccee",
      "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
