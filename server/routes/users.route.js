const express = require("express");
const router = express.Router();

const authenticate = require("../config/authentication");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//importing db modules
const User = require("../models/user.model");

router.post("/login", async (req, res) => {
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

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("Missing input for user registration");
    }

    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      return res.status(409).send("User already registered");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
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

router.get("/", (req, res) => {
    //TODO: return the user information
});

router.delete("/all", authenticate, (req, res) => {
  // User.deleteMany({})
  //   .then((response) => console.log(response))
  //   .catch(err => console.log(err));
});

router.get("/all", (req, res) => {
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
  
router.post("/authentication", function (req, res) {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
  
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = decoded;
      console.log(req.user);
      res.status(200).send("Valid Token");
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
});
  
router.patch("/:symbol", (req, res) => {
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

module.exports = router;
