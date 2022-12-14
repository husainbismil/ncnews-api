const model = require("../model/model");
const errors = require("../controller/errors.js");

// /api/topics Endpoints
const getApiTopics = (request, response) => {
    model.topics.selectTopics().then((selectTopicsResponseObject) => {
        response.status(200).send(selectTopicsResponseObject);
    }).catch((err) => {
        response.status(404).send(errors.res404);
    });
};

// /api/articles Endpoints
const getApiArticles = (request, response) => {
    model.articles.selectArticles().then((responseObject) => {

        response.status(200).send(responseObject);

    }).catch((err) => {
        response.status(404).send(errors.res404);
    });
};

module.exports = {
    errors,
    topics: { getApiTopics },
    articles: { getApiArticles }, 
    comments: {},
    users: {}
};