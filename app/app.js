const express = require("express");
const controller = require("../controller/controller.js");
const app = express();


// Parse JSON by default
app.use(express.json());

// Endpoints
app.get("/api/topics", controller.getApiTopics);

// Error Handling

app.all('/*', (req, res) => {
    res.status(404).send({ msg: 'Error 404: Route not found' });
});
 
app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(500)
         .send ({msg : 'Error 500: Internal Server Error'});
});


module.exports = app;