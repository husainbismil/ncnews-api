const db = require("../db/connection.js");

exports.selectTopics = () => {
    return db.query("SELECT * FROM topics;").then((selectTopicsQueryResult) => {
        const selectTopicsResponseObject = {topics: selectTopicsQueryResult.rows};
        return selectTopicsResponseObject;
    });
};

exports.selectArticles = () => {
    return db.query("SELECT * FROM articles ORDER BY created_at DESC;").then((selectArticlesQueryResult) => {
        const articlesArray = selectArticlesQueryResult.rows;
        
        // TODO: consider changing below to use MAP instead of foreach?
        const buildArticleIdArray = function (articleElement) {
            articleIdArray.push(articleElement["article_id"]);
        };

        // for each article ID in articlesArray, store ID in its own array called articleIdArray
        const articleIdArray = [];
        articlesArray.forEach(buildArticleIdArray);
        return [articleIdArray, articlesArray];
    });
};

exports.selectCommentsByArticleId = (articleIdArray, articlesArray) => {
    // since the article Ids will be fetched from the database, there is probs no need to protect from sql injection here, as the user doesn't provide input to this part of the code.
    // for each articleId in articleIdArray, build the sql query.
    // first convert articleIdArray to comma seperated values (csv).
    const articleIdCsv = articleIdArray.toString();
    const sqlQuery = `SELECT * FROM comments WHERE article_id in (${articleIdCsv}) ORDER BY created_at DESC;`;

    return db.query(sqlQuery).then((queryResult) => {
        const selectCommentsByArticleIdOutput = [queryResult, articlesArray]

        const returnedCommentsArray = selectCommentsByArticleIdOutput[0].rows;
            //const articlesArray = selectCommentsByArticleIdOutput[1];

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
            return responseObject;
    });
};