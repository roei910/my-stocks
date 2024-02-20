const express = require("express");
const cors = require("cors");

const setupMiddlewares = (app) => {
    app.use(express.static("public"));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PATCH"],
    }));
    // app.use(customMiddleware);
};

module.exports = setupMiddlewares;