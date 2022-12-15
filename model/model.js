const db = require("../db/connection.js");

const selectTopics = () => {
    return db.query("SELECT * FROM topics;").then((selectTopicsQueryResult) => {
        const selectTopicsResponseObject = {topics: selectTopicsQueryResult.rows};
        return selectTopicsResponseObject;
    });
};

const selectArticles = () => {
    const sqlQuery = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, CAST(COUNT(comments.*) AS int) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY created_at DESC;`

    return db.query(sqlQuery).then((queryResult) => {
        
        const responseObject = {articles: queryResult.rows};
        return responseObject;
    });
};

const selectCommentsByArticleId = (articleId) => {
    const sqlQueryParameters = [Number(articleId)];
    const sqlQuery = `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`;

    return db.query(sqlQuery, sqlQueryParameters).then((selectCommentsByArticleIdQueryResult) => {
        return selectCommentsByArticleIdQueryResult;
    });
};

const selectArticleByArticleId = (articleId) => {
    const securedArticleId = Number(articleId);
    
    const sqlQueryParameters = [securedArticleId];
    const sqlQuery = `SELECT * FROM articles WHERE article_id = $1;`;

    return db.query(sqlQuery, sqlQueryParameters).then((selectArticleByArticleIdQueryResult) => {
        return selectArticleByArticleIdQueryResult;
    });   

};

const insertCommentByArticleId = (articleId, commentObject) => {
    // skipping check to see if commentObject is in correct format, assuming i need to just stick to happy path only
    const securedArticleId = Number(articleId);
    const commentAuthor = commentObject.username;
    const commentBody = commentObject.body;

    const sqlQueryParameters = [securedArticleId, commentAuthor, commentBody];
    const sqlQuery = `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`;

    return db.query(sqlQuery, sqlQueryParameters).then((insertCommentByArticleIdResult) => {
        return insertCommentByArticleIdResult;
    });   

};

const updateArticleVotesByArticleId = (articleId, incVotesObject) => {
    const securedArticleId = Number(articleId);
    const incVotes = Number(incVotesObject["inc_votes"]);

    const sqlQueryParameters = [incVotes, securedArticleId];
    const sqlQuery = `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`;

    return db.query(sqlQuery, sqlQueryParameters).then((updateArticleVotesByArticleIdResult) => {
        return updateArticleVotesByArticleIdResult;
    });   


}

// Exports
module.exports = {
    topics: {
        selectTopics
    },
    articles: {
        selectArticles, 
        selectArticleByArticleId, 
        updateArticleVotesByArticleId
    }, 
    comments: {
        selectCommentsByArticleId, 
        insertCommentByArticleId
    },
    users: {

    }
};