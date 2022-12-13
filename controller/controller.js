const model = require("../model/model");

// TODO: find out how error catching is meant to be, repeating .catch here seems not very DRY
// TODO: set up routers to make this stuff look cleaner

// /api/topics Endpoints
exports.getApiTopics = (request, response) => {
    model.selectTopics().then((selectTopicsQueryResult) => {
        const responseObject = {topics: selectTopicsQueryResult.rows};
        response.status(200).send(responseObject);
    }).catch((err) => {
        console.log(err);
    });
};

// /api/articles Endpoints
exports.getApiArticles = (request, response) => {
    // TODO: instead of doing this for every articles request, find way to just store comment count in the db and keep it updated, that way theres no need to calculate it
    model.selectArticles().then((selectArticlesQueryResult) => {
        // queryResult = selected articles
        const articlesArray = selectArticlesQueryResult.rows;
        
        // TODO: consider changing below to use MAP instead of foreach?
        const buildArticleIdArray = function (articleElement) {
            articleIdArray.push(articleElement["article_id"]);
        };

        // for each article ID in articlesArray, store ID in its own array called articleIdArray
        const articleIdArray = [];
        articlesArray.forEach(buildArticleIdArray);

        // articleIdArray is now built.
        // query comments, get all comments that match those article Ids, store them in an array returnedCommentsArray
        model.selectCommentsByArticleId(articleIdArray, articlesArray).then((selectCommentsByArticleIdOutput) => {
            const returnedCommentsArray = selectCommentsByArticleIdOutput[0].rows;
            const articlesArray = selectCommentsByArticleIdOutput[1];

            const feArticleCountComments = function (articleElement) {
                const calculateArticleCommentCount = function (commentElement) {
                    if (commentElement["article_id"] === currentArticleId) {
                        currentArticleCommentCount++;
                    };
                };
                
                const currentArticleId = articleElement["article_id"];
                let currentArticleCommentCount = 0;
                
                // for each in returnedCommentsArray, count how many objectElements have an articleId that matches given articleId.
                returnedCommentsArray.forEach(calculateArticleCommentCount);

                // currentArticleCommentCount is now built.
                // assuming each articleID is unique, this should work.
                // for each article, store its comment count in an object (commentcountbyarticleid), where key = article id, keyval = comment count
                commentCountByArticleId[currentArticleId] = currentArticleCommentCount;
            };

            const feArticleUpdateCommentCount = function (articleElement, articleArrayIndex) {
                const currentArticleId = articleElement["article_id"];
                const commentCount = commentCountByArticleId[currentArticleId];
                updatedArticlesArray[articleArrayIndex]["comment_count"] = commentCount
            };
           
            // new variable updatedArticlesArray, a clone of articlesArray.
            const updatedArticlesArray = [...articlesArray];

            // for each article ID in article array, count how many comments it has in returnedCommentsArray, and store the number of comments in anarray formatted like [[articleID, number-of-comments]], called commentCountByArticleId
            const commentCountByArticleId = {};
            articlesArray.forEach(feArticleCountComments);

            // commentCountByArticleId array is now built.
            // for each in updatedArticlesArray, get the number of comments using the currnet articleiD and commentCountByArticleId
            updatedArticlesArray.forEach(feArticleUpdateCommentCount);

            const responseObject = {articles: updatedArticlesArray};

            // respond with the updatedArticlesArray            
            response.status(200).send(responseObject);
            
        });

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

// TODO: find out how error catching is meant to be, repeating .catch here seems not very DRY
    
