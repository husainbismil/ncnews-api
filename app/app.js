const express = require("express");
const controller = require("../controller/controller.js");
const app = express();


// Parse JSON by default
// removed until its in use

// Endpoints
app.get("/api/topics", controller.getApiTopics);
app.get("/api/articles", controller.getApiArticles);

// Error Handling
// removed until test suite for error handling checks is made

module.exports = app;


// TODO: complete changes in PR 2, then 