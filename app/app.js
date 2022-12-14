const express = require("express");
const controller = require("../controller/controller.js");
const app = express();

// Parse JSON by default
app.use(express.json());

// Endpoints

// Topics
app.get("/api/topics", controller.topics.getApiTopics);

// Articles
app.get("/api/articles", controller.articles.getApiArticles);
app.get("/api/articles/:article_id", controller.articles.getArticleById);

// Comments
app.get("/api/articles/:article_id/comments", controller.comments.getCommentsByArticleId);

// Users

// Error Handling
app.all('*', controller.errors.fileNotFound);
app.use(controller.errors.testNext404);

// Exports
module.exports = app;