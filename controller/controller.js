const model = require("../model/model");

// /api/topics Endpoints
exports.getApiTopics = (request, response) => {
    model.selectTopics().then((selectTopicsResponseObject) => {
        response.status(200).send(selectTopicsResponseObject);
    }).catch((err) => {
        console.log(err);
    });
};

// /api/articles Endpoints
exports.getApiArticles = (request, response) => {
    model.selectArticles().then((responseObject) => {

        response.status(200).send(responseObject);

    });
};