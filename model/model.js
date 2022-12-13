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

exports.selectCommentsByArticleId = (articleIdArrayOrNumber, articlesArray) => {
    // since the article Ids will be fetched from the database, there is probs no need to protect from sql injection here, as the user doesn't provide input to this part of the code.
    // for each articleId in articleIdArray, build the sql query.
    // first convert articleIdArray to comma seperated values (csv).
    let singleArticle = false; 

    if (Array.isArray(articleIdArrayOrNumber)) {
    const articleIdCsv = articleIdArrayOrNumber.toString();
    const sqlQuery = `SELECT * FROM comments WHERE article_id in (${articleIdCsv}) ORDER BY created_at DESC;`;


    return db.query(sqlQuery).then((selectCommentsByArticleIdQueryResult) => {
        const returnedOutput = [selectCommentsByArticleIdQueryResult, articlesArray];
        return returnedOutput;
    });
    } else {
        // use parameterised queries as this is a user input in this case
        singleArticle = true;
        const securedArticleId = Number(articleIdArrayOrNumber);
        const sqlQueryParameters = [securedArticleId];
        const sqlQuery = `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`;

        return db.query(sqlQuery, sqlQueryParameters).then((selectCommentsByArticleIdQueryResult) => {
                return selectCommentsByArticleIdQueryResult;
        });
    };

};

exports.selectArticleByArticleId = (articleId) => {
    // as this involves querying for user input, protection from SQL injection will need to be implemented
    const securedArticleId = Number(articleId);
    
    const sqlQueryParameters = [securedArticleId];
    const sqlQuery = `SELECT * FROM articles WHERE article_id = $1;`;

    return db.query(sqlQuery, sqlQueryParameters).then((selectArticleByArticleIdQueryResult) => {
        return selectArticleByArticleIdQueryResult;
    });   

};