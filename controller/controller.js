const model = require("../model/model");

// /api/topics Endpoints
const getApiTopics = (request, response) => {
    model.topics.selectTopics().then((selectTopicsResponseObject) => {
        response.status(200).send(selectTopicsResponseObject);
    }).catch((err) => {
        console.log(err);
    });
};

// /api/articles Endpoints
const getApiArticles = (request, response) => {
    model.articles.selectArticles().then((responseObject) => {

        response.status(200).send(responseObject);

    });
};

// /api/articles/:article_id Endpoints
const getArticleById = (request, response) => {
    const articleId = request.params["article_id"];

    model.articles.selectArticleByArticleId(articleId).then((selectArticleByArticleIdResult) => {
        const responseObject = {};
        responseObject.article = selectArticleByArticleIdResult.rows[0];

        response.status(200).send(responseObject);
    });

};

// 6. GET /api/articles/:article_id/comments
const getCommentsByArticleId = (request, response) => {
    const articleId = request.params["article_id"];

    model.comments.selectCommentsByArticleId(articleId).then((selectCommentsByArticleIdOutput) => {
        const feCommentRemoveArticleId = function (element, index) {
            delete returnedCommentsArray[index]["article_id"];
        };

        const responseObject = {};
        const returnedCommentsArray = selectCommentsByArticleIdOutput.rows;

        // for each comment, remove article_id before responding
        returnedCommentsArray.forEach(feCommentRemoveArticleId);
        responseObject.comments = returnedCommentsArray;
        response.status(200).send(responseObject);
    });

};

// 7. POST /api/articles/:article_id/comments
const postCommentToArticle = (request, response) => {
    const articleId = request.params["article_id"];
    const commentObject = request.body;

    model.comments.insertCommentByArticleId(articleId, commentObject).then((insertCommentByArticleIdResult) => {
        
        const responseObject = {comment: insertCommentByArticleIdResult.rows[0]};
        response.status(201).send(responseObject);

    }).catch((err) => {
        console.log(err);
    });
};


const errors = require("../controller/errors.js");

module.exports = {
    errors,
    topics: { getApiTopics },
    articles: { getApiArticles, getArticleById }, 
    comments: { getCommentsByArticleId, postCommentToArticle },
    users: {}
};
    
