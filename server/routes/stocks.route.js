const express = require("express");
const router = express.Router();
const authenticate = require("../config/authentication");
const axios = require("axios");
const { JSDOM } = require("jsdom");

//importing db modules
const Stock = require("../models/stock.model");

//after authenctication
router.get("/", authenticate, (req, res) => {
  res.send("Product Home Page");
});

router.get("/symbol/:symbol", async (req, res) => {
  const stockSymbol = req.params.symbol;

  await Stock.findOne({ symbol: stockSymbol })
    .then(async (stock) => {
      if(!stock){
        let stockInfo = await getStockFromYahoo(stockSymbol);
        await Stock.create(stockInfo).then((stock) => console.log(`stock created successfully, ${stock.name}`));
        res.status(201).json(stockInfo); //TODO: change to correct status, created new stock
      }
      else
        res.status(200).send({
          message: "symbol was found in db",
          data: stock});
    })
    .catch(() => {
      res.status(400).send("couldnt find symbol");
    });
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

async function getStockFromYahoo(symbol) {
  try {
    const stockPage = await fetch(`https://finance.yahoo.com/quote/${symbol}`);
    const htmlStockPage = await stockPage.text();
    const domStockPage = new JSDOM(htmlStockPage);
    const stockPageDocument = domStockPage.window.document;

    const analysisPage = await fetch(
      `https://finance.yahoo.com/quote/${symbol}/analysis`
    );
    const analysisHtmlPage = await analysisPage.text();
    const domAnalysisPage = new JSDOM(analysisHtmlPage);
    const analysisPageDocument = domAnalysisPage.window.document;

    const tableBodyElement = analysisPageDocument.querySelector(
      '[data-test="qsp-analyst"] > table:nth-child(7) > tbody'
    );

    try {
      return {
        name: stockPageDocument
          .querySelector("#quote-header-info > div > div > div > h1")
          .textContent.trim(),
        symbol: symbol,
        stockPrice: stockPageDocument
          .querySelector(
            '[data-test="qsp-price"][data-field="regularMarketPrice"]'
          )
          .textContent.trim(),
        afterHoursPrice: stockPageDocument
          .querySelector('[data-field="postMarketPrice"]')
          .textContent.trim(),
        oneYearEstimate: stockPageDocument
          .querySelector('[data-test="ONE_YEAR_TARGET_PRICE-value"]')
          .textContent.trim(),
        growthEstimate: {
          currentQtr: tableBodyElement
            .querySelector("tr:nth-child(1) > td:nth-child(2)")
            .textContent.trim(),
          nextQtr: tableBodyElement
            .querySelector("tr:nth-child(2) > td:nth-child(2)")
            .textContent.trim(),
          currentYear: tableBodyElement
            .querySelector("tr:nth-child(3) > td:nth-child(2)")
            .textContent.trim(),
          nextYear: tableBodyElement
            .querySelector("tr:nth-child(4) > td:nth-child(2)")
            .textContent.trim(),
          nextFiveYears: tableBodyElement
            .querySelector("tr:nth-child(5) > td:nth-child(2)")
            .textContent.trim(),
          pastFiveYears: tableBodyElement
            .querySelector("tr:nth-child(6) > td:nth-child(2)")
            .textContent.trim(),
        },
        dateUpdated: new Date().toGMTString()
      };
    } catch (e) {
      console.error("Failed to find stock information from yahoo finance");
      return null;
    }
  } catch (error) {
    console.error("Error fetching AAPL stock price:", error);
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

  try {
    const response = await axios.request(options);
    if (response.data.data.length > 0) {
      return response.data.data[0];
    } else {
      return [];
    }
  } catch (err) {
    console.error(err);
    return null;
  }
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

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getInsightsBySymbol(stockSymbol) {
  const axios = require("axios");

  const options = {
    method: "GET",
    url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-insights",
    params: { symbol: stockSymbol },
    headers: {
      "X-RapidAPI-Key": "3cfd02f090msh4bd229c6a961da5p100578jsne25c8024ccee",
      "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.finance.result;
  } catch (error) {
    console.error(error);
  }
}

module.exports = router;
