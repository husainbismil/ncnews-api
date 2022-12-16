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
app.patch("/api/articles/:article_id", controller.articles.patchArticleVotesByArticleId);

// Comments
app.get("/api/articles/:article_id/comments", controller.comments.getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", controller.comments.postCommentToArticle);

// Users
app.get("/api/users", controller.users.getUsers);

// Error Handling
app.use(controller.errors.psqlErrorHandling);
app.all('*', controller.errors.fileNotFound);
app.use(controller.errors.testNext404);
app.use(controller.errors.testNext400);

// Exports
module.exports = app;