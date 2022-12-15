const model = require("../model/model");
const errors = require("../controller/errors.js");

// /api/topics Endpoints
const getApiTopics = (request, response, next) => {
    model.topics.selectTopics().then((selectTopicsResponseObject) => {
        response.status(200).send(selectTopicsResponseObject);
    }).catch((err) => {
        next(err);
    });
};

// /api/articles Endpoints
const getApiArticles = (request, response, next) => {
    model.articles.selectArticles().then((responseObject) => {

        response.status(200).send(responseObject);

    }).catch((err) => {
        next(err);
    });
};

// /api/articles/:article_id Endpoints
const getArticleById = (request, response, next) => {
    const articleId = request.params["article_id"];

    model.articles.selectArticleByArticleId(articleId).then((responseObject) => {
          response.status(200).send(responseObject);
    }).catch((err) => {
        next(err);
    });

};

// 6. GET /api/articles/:article_id/comments
const getCommentsByArticleId = (request, response, next) => {
    const articleId = request.params["article_id"];

    model.comments.selectCommentsByArticleId(articleId).then((responseObject) => {

   
        response.status(200).send(responseObject);
    }).catch((err) => {
        next(err);
      });

};

module.exports = {
    errors,
    topics: { getApiTopics },
    articles: { getApiArticles, getArticleById }, 
    comments: { getCommentsByArticleId },
    users: {}
};