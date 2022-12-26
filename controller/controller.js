const model = require("../model/model");
const errors = require("../controller/errors.js");
const ts = Date.now();


const ptApiEndpoints = (request, response) => {
    response.status(200).send(errors.pte);
};


// /api/topics Endpoints
const getApiTopics = (request, response, next) => {
    model.topics.selectTopics().then((selectTopicsResponseObject) => {
        response.status(200).send(selectTopicsResponseObject);
    }).catch((err) => {
        next(err);
    });
};

// /api/articles Endpoints + Task 10 (URL Parameters)
const getApiArticles = (request, response, next) => {
    const urlParams = request.query;

    model.articles.selectArticles(urlParams).then((responseObject) => {
        response.status(200).send(responseObject);

    }).catch(err => {
        next(err);
    });
};

// /api/articles/:article_id Endpoints, + Task 11
const getArticleById = (request, response, next) => {
    const articleId = request.params["article_id"];

    model.articles.selectArticleByArticleId(articleId).then((selectArticleByArticleIdResult) => {
        const responseObject = {timestamp: ts};
        responseObject.article = selectArticleByArticleIdResult;
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
        next(err);
    });

};

// 9. GET /api/users
const getUsers = (request, response, next) => {
    model.users.selectUsers().then((responseObject) => {
        response.status(200).send(responseObject);
    }).catch((err) => {
        next(err);
    });

};

const deleteCommentByCommentId = (request, response, next) => {
    const commentId = request.params["comment_id"];

    model.comments.deleteCommentByCommentId(commentId).then(() => {
        
        response.status(204).send({timestamp: ts});

    }).catch((err) => {
        next(err);
    });


};

// GET /api/

const jsonEndpoints = require("../endpoints.json");

const getApiEndpoints = (request, response) => {
    response.status(200).send(jsonEndpoints);
};



// Exports
module.exports = {
    errors,
    getApiEndpoints,
    ptApiEndpoints,
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
        postCommentToArticle, 
        deleteCommentByCommentId
    },
    users: {
        getUsers
    }
};
    
