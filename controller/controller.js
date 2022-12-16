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

// 7. POST /api/articles/:article_id/comments
const postCommentToArticle = (request, response, next) => {
    const articleId = request.params["article_id"];
    const commentObject = request.body;

    model.comments.insertCommentByArticleId(articleId, commentObject).then((responseObject) => {
        
        response.status(201).send(responseObject);

    }).catch((err) => {
        next(err);
      });
};

// 8. PATCH /api/articles/:article_id
const patchArticleVotesByArticleId = (request, response, next) => {
    const articleId = request.params["article_id"];
    const incVotesObject = request.body;
    
    model.articles.updateArticleVotesByArticleId(articleId, incVotesObject).then((responseObject) => {
        
        response.status(200).send(responseObject);

    }).catch((err) => {
        console.log(err)
        next(err);
    });

};

// Exports
module.exports = {
    errors,
    topics: { 
        getApiTopics 
    },
    articles: { 
        getApiArticles, 
        getArticleById, 
        patchArticleVotesByArticleId 
    }, 
    comments: { 
        getCommentsByArticleId, 
        postCommentToArticle 
    },
    users: {}
};
    
