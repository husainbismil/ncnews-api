const express = require("express");
const controller = require("../controller/controller.js");
const app = express();

// Parse JSON by default

// Endpoints

// Topics
app.get("/api/topics", controller.topics.getApiTopics);

// Articles
app.get("/api/articles", controller.articles.getApiArticles);
app.get("/api/articles/:article_id", controller.articles.getArticleById);

// Comments
// Users

// Error Handling
app.all('*', controller.errors.fileNotFound);
app.use(controller.errors.psqlErrorHandling);
app.use(controller.errors.testNext404);
app.use(controller.errors.testNext400);

// Exports
module.exports = app;
