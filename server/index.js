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
      if(response.data.data.length > 0) {
      console.log(response.data.data[0]);
        return response.data.data[0];
      } else {
        return [];
      }
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