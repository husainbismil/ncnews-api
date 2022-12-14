const express = require("express");
const controller = require("../controller/controller.js");
const app = express();


// Parse JSON by default
// rm

// Endpoints
app.get("/api/topics", controller.getApiTopics);
app.get("/api/articles", controller.getApiArticles);

// Error Handling
// rm

module.exports = app;

