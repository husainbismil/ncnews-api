const express = require("express");
const controller = require("../controller/controller.js");
const app = express();

// Parse JSON by default
// removed app use express json for now

// Endpoints
app.get("/api/topics", controller.getApiTopics);
app.get("/api/articles", controller.getApiArticles);
app.get("/api/articles/:article_id", controller.getArticleById);
app.get("/api/articles/:article_id/comments", controller.getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", controller.postCommentToArticle);


//api/articles/:article_id/comments
// Error Handling
// removed until test suite for error handling checks is made

module.exports = app;