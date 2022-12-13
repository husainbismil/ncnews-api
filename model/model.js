const db = require("../db/connection.js");

exports.selectTopics = () => {
    return db.query("SELECT * FROM topics;").then((queryResult) => {
        return queryResult;
    });
};

exports.selectArticles = () => {
    return db.query("SELECT * FROM articles ORDER BY created_at DESC;").then((queryResult) => {
        return queryResult;
    });
};

exports.selectCommentsByArticleId = (articleIdArray, articlesArray) => {
    // since the article Ids will be fetched from the database, there is probs no need to protect from sql injection here, as the user doesn't provide input to this part of the code.
    // for each articleId in articleIdArray, build the sql query.
    // first convert articleIdArray to comma seperated values (csv).
    const articleIdCsv = articleIdArray.toString();
    const sqlQuery = `SELECT * FROM comments WHERE article_id in (${articleIdCsv}) ORDER BY created_at DESC;`;

    return db.query(sqlQuery).then((queryResult) => {
        const returnedOutput = [queryResult, articlesArray]
        return returnedOutput;
    });
};