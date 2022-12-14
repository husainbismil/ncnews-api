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

// /api/articles/:article_id Endpoints
exports.getArticleById = (request, response) => {
    const articleId = request.params["article_id"];

    model.selectArticleByArticleId(articleId).then((selectArticleByArticleIdResult) => {
        const responseObject = {};
        responseObject.article = selectArticleByArticleIdResult.rows[0];

        response.status(200).send(responseObject);
    });

};

// 6. GET /api/articles/:article_id/comments
exports.getCommentsByArticleId = (request, response) => {
    const articleId = request.params["article_id"];

    model.selectCommentsByArticleId(articleId).then((selectCommentsByArticleIdOutput) => {
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