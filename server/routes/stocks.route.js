const express = require('express');
const router = express.Router();

const { JSDOM } = require('jsdom');

//importing db modules
const Stock = require("../models/stock.model");

router.get('/', (req, res) => {
    res.send('Product Home Page');
});

router.get("/symbol/:symbol", (req, res) => {
  fetchStockBySymbol("AAPL");



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

async function fetchStockBySymbol(symbol) {
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

module.exports = router;