const db = require("../db/connection.js");

exports.selectTopics = () => {
    return db.query("SELECT * FROM topics;").then((selectTopicsQueryResult) => {
        const selectTopicsResponseObject = {topics: selectTopicsQueryResult.rows};
        return selectTopicsResponseObject;
    });
};

exports.selectArticles = () => {
    const sqlQuery = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, COUNT(comments.*) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY created_at DESC;`

    return db.query(sqlQuery).then((queryResult) => {
        // Convert values to correct formats
        queryResult.rows.forEach((element) => {
            element["comment_count"] = Number(element["comment_count"]);
        });

        const responseObject = {articles: queryResult.rows};
        return responseObject;
    });
};

exports.selectCommentsByArticleId = (articleId) => {
    const sqlQueryParameters = [Number(articleId)];
    const sqlQuery = `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`;

    return db.query(sqlQuery, sqlQueryParameters).then((selectCommentsByArticleIdQueryResult) => {
        return selectCommentsByArticleIdQueryResult;
    });
};

exports.selectArticleByArticleId = (articleId) => {
    const securedArticleId = Number(articleId);
    
    const sqlQueryParameters = [securedArticleId];
    const sqlQuery = `SELECT * FROM articles WHERE article_id = $1;`;

    return db.query(sqlQuery, sqlQueryParameters).then((selectArticleByArticleIdQueryResult) => {
        return selectArticleByArticleIdQueryResult;
    });   

};