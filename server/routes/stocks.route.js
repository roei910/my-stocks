const express = require('express');
const router = express.Router();
const authenticate = require("../config/authentication");

const { JSDOM } = require('jsdom');

//importing db modules
const Stock = require("../models/stock.model");

//after authenctication
router.get('/', authenticate, (req, res) => {
    res.send('Product Home Page');
});

router.get("/symbol/:symbol", (req, res) => {
    getStockPriceBySymbol("AAPL");



    const stockSymbol = req.params.symbol;
    Stock.findOne({ symbol: stockSymbol }).then((found) => {
      if (!found) {
        let stock = getStockNameBySymbol(stockSymbol);
        res.send(stock);
        // getStockDataBySymbol(stockSymbol);
        //create a new stock object and save to mongo db using mongoose
      }
    });
    // res.json({ stock: stocks.find((stk) => stk.symbol === stockSymbol) });
});
  
router.get("/name/:name", (req, res) => {
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

async function getStockPriceBySymbol(symbol) {
    try {
        const response = await fetch('https://finance.yahoo.com/quote/' + symbol);
        const html = await response.text();
  
        const dom = new JSDOM(html);
        const doc = dom.window.document;
        
        // Find the element containing the stock price
        const priceElement = doc.querySelector('[data-test="OPEN-value"]');
        if (priceElement) {
            const stockPrice = priceElement.textContent.trim();
            console.log(`${symbol} stock price:`, stockPrice);
            return stockPrice;
        } else {
            console.error('Failed to find AAPL stock price element');
            return null;
        }
    } catch (error) {
        console.error('Error fetching AAPL stock price:', error);
        return null;
    }
}

async function getStockNameBySymbol(stockSymbol) {
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

async function getStockDataBySymbol(stockSymbol) {
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

module.exports = router;