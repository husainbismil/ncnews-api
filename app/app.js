const express = require("express");
const c = require("../controller/controller.js");
const app = express();


// Parse JSON by default
// removed app use express json for now

// Endpoints
app.get("/api/topics", c.getApiTopics);

// Error Handling

// removed 404 and 500 responses from here as tests have not been made yet. make tests to check error handling prior to writing the error handling here


module.exports = app;
