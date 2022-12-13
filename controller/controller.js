const model = require("../model/model");

// TODO: find out how error catching is meant to be, repeating .catch here seems not very DRY

// /api/topics Endpoints
exports.getApiTopics = (request, response) => {
    model.selectTopics().then((queryResult) => {
        const responseArray = queryResult.rows;
        response.status(200).send(responseArray);
    }).catch((err) => {
        console.log(err);
    });
};

// /api/articles Endpoints
exports.getApiArticles = (request, response) => {
    model.selectArticles().then((queryResult) => {
        // queryResult = selected articles
        const articlesArray = queryResult.rows;
        
        // for each article ID in articlesArray, store ID in its own array called articleIdArray
        const articleIdArray = [];
        const buildArticleIdArray = function (articleElement) {
            articleIdArray.push(articleElement["article_id"]);
        };
        articlesArray.forEach(buildArticleIdArray);

        // articleIdArray is now built.
        // query comments, get all comments that match those article Ids, store them in an array returnedCommentsArray
        model.selectCommentsByArticleId(articleIdArray, articlesArray).then((returnedOutput) => {
            // queryResult = selected comments, that were selected by Article ID
            const returnedCommentsArray = returnedOutput[0].rows;
            const articlesArray = returnedOutput[1];
            const commentCountByArticleId = {};

            // for each article ID in article array, count how many comments it has in returnedCommentsArray, and store the number of comments in anarray formatted like [[articleID, number-of-comments]], called commentCountByArticleId
            const feArticleCountComments = function (articleElement) {
                const currentArticleId = articleElement["article_id"];
                let currentArticleCommentCount = 0;
                // for each in returnedCommentsArray, count how many objectElements have an articleId that matches given articleId.
                const calculateArticleCommentCount = function (commentElement) {
                    if (commentElement["article_id"] === currentArticleId) {
                        currentArticleCommentCount++;
                    };
                };
                returnedCommentsArray.forEach(calculateArticleCommentCount);
                // currentArticleCommentCount is now built.
                // assuming each articleID is unique, this should work.
                commentCountByArticleId[currentArticleId] = currentArticleCommentCount;
            };

            articlesArray.forEach(feArticleCountComments);
            // commentCountByArticleId array is now built.
            // new variable updatedArticlesArray, a clone of articlesArray.
            const updatedArticlesArray = [...articlesArray];

            // for each in updatedArticlesArray, get the number of comments using the currnet articleiD and commentCountByArticleId
            const feArticleUpdateCommentCount = function (articleElement, articleArrayIndex) {
                const currentArticleId = articleElement["article_id"];
                const commentCount = commentCountByArticleId[currentArticleId];
                updatedArticlesArray[articleArrayIndex]["comment_count"] = commentCount
            };

            updatedArticlesArray.forEach(feArticleUpdateCommentCount);
            
            // respond with the updatedArticlesArray            
            response.status(200).send(updatedArticlesArray);
            
        });

    });
};

// TODO: find out how error catching is meant to be, repeating .catch here seems not very DRY
    
