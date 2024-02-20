const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    name: String,
    symbol: String,
    stockPrice: Number,//at close, [data-field="regularMarketPrice"]
    afterHoursPrice: Number,//after close, [data-field="postMarketPrice"]
    oneYearEstimate: Number,//[data-test="ONE_YEAR_TARGET_PRICE-value"]
    growthEstimate: {//https://finance.yahoo.com/quote/AAPL/analysis
        //'[data-test="qsp-analyst"] > table:nth-child(7) > tbody' => the table
        currentQtr: String,// > tr:nth-child(1) > td:nth-child(2)
        nextQtr: String,// > tr:nth-child(2) > td:nth-child(2)
        currentYear: String,// > tr:nth-child(3) > td:nth-child(2)
        nextYear: String,// > tr:nth-child(4) > td:nth-child(2)
        nextFiveYears: String,// > tr:nth-child(5) > td:nth-child(2)
        pastFiveYears: String,// > tr:nth-child(6) > td:nth-child(2)
    },
    dateUpdated: Date
});

module.exports = mongoose.model('Stock', stockSchema);