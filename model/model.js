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
    const sqlQuery = `SELECT comment_id, author, created_at, body, votes FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`;

    return db.query(sqlQuery, sqlQueryParameters).then((selectCommentsByArticleIdOutput) => {
        const responseObject = {};
        const returnedCommentsArray = selectCommentsByArticleIdOutput.rows;
        if (returnedCommentsArray.length > 0) {
        responseObject.comments = returnedCommentsArray;
        return responseObject;
        } else {
            return Promise.reject("Nothing was returned from database. ")
        };
    });
};

const selectArticleByArticleId = (articleId) => {
    const securedArticleId = Number(articleId);
    // had trouble with this one, but its like 4am so i cant nchelp. definetly needs changes
    // const sqlQueryParameters = [securedArticleId];

    const sqlQuery = `SELECT articles.*, COUNT(comments.*) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY created_at DESC;`;

    return db.query(sqlQuery).then((selectArticleByArticleIdQueryResult) => {
        let articleOutput =  selectArticleByArticleIdQueryResult.rows;
        // for each row, find article id
        const filterArticleOutput = function (element) {
            if (Number(element["article_id"]) === securedArticleId) {
                return element;
            };
        };
        // there is probably a SQL query way to do this that i cant think of :( ... will change once i find out how to do it
        articleOutput = articleOutput.filter(filterArticleOutput);

        // converting string to num
        const objectOutput = articleOutput[0];
  
        if (objectOutput) {
            objectOutput["comment_count"] = Number(objectOutput["comment_count"]);
            return objectOutput;
        } else {
            return Promise.reject();
        };
        // will change above once i find out how to do it properly, too late rn to nchelp

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
        if (insertCommentByArticleIdResult.rows) {
        const responseObject = {comment: insertCommentByArticleIdResult.rows[0]};
        return responseObject;
        } else {
            return Promise.reject({errcode: 404});
        };
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

const selectUsers = () => {
    const sqlQuery = `SELECT * FROM users ORDER BY username ASC;`;

    return db.query(sqlQuery).then((selectUsersResult) => {
        return selectUsersResult;
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
        selectUsers
    }
};