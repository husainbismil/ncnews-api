const express = require("express");
const controller = require("../controller/controller.js");
const app = express();

// Endpoints

// Topics
app.get("/api/topics", controller.topics.getApiTopics);

// Articles
app.get("/api/articles", controller.articles.getApiArticles);


// Comments
// Users

// Error Handling
app.all('*', controller.errors.fileNotFound);
app.use(controller.errors.testNext404);

// Exports
module.exports = app;