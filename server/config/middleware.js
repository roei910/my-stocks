const express = require("express"); //run local server
const cors = require("cors");

module.exports = (req, res, next) => {
    express.static("public");
    express.urlencoded({ extended: true });
    express.json();
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'PATCH']
    })
    next();
}