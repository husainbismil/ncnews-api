const db = require("../db/connection.js");

const ts = Date.now().toISOString();

const selectTopics = () => {
    return db.query("SELECT * FROM topics;").then((selectTopicsQueryResult) => {
        const selectTopicsResponseObject = {topics: selectTopicsQueryResult.rows, timestamp: ts};
        return selectTopicsResponseObject;
    });
};

const selectArticles = (urlParams) => {
    const lowercaseParams = {};
    Object.keys(urlParams).forEach((element, index) => {
        // default to lowercase
        lowercaseParams[element.toLowerCase()] = urlParams[element].toLowerCase();
    });


    let isError = false;
    let isErrorString = "";
    let sortBy = "created_at";
    let topicBool = false;
    let topic = "";
    let order = "desc"


    if (urlParams) {
                
        if (lowercaseParams["sort_by"]) {
            // check if a valid column was specified
            const columnsList = ["title","topic","author","body","created_at","votes"];
            if (columnsList.includes(lowercaseParams["sort_by"])) {
                sortBy = lowercaseParams["sort_by"];
            } else {
                isError = true;
                isErrorString = "invalid parameter was specified in sort_by";
            };
        };

        if (lowercaseParams["order"]) {


            const orderListAsc = ["asc",  "ascending",  "a"];
            const orderListDesc = ["desc", "descending", "d"];

            if (orderListAsc.includes(lowercaseParams["order"])) {
                order = "asc";
            } else if (orderListDesc.includes(lowercaseParams["order"])) {
                order = "desc";
            } else {
                isError = true;
                isErrorString = "";
            };
        };

        if (lowercaseParams["topic"]) {
            topicBool = true;
            topic =   lowercaseParams["topic"];          

        };

    };       
       
        const sqlQuery = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, CAST(COUNT(comments.*) AS int) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY ${sortBy} ${order};`;
          
    
 
    return db.query(sqlQuery).then((queryResult) => {
        
        const responseObject = {timestamp: ts};

        if (topicBool) {
            const topicFilteredResult = queryResult.rows.filter((element) => {
                if (element.topic.toLowerCase() === topic) {return element;};
            });
            
            responseObject.articles = topicFilteredResult;

        } else {
            responseObject.articles = queryResult.rows;
        };

        if (isError) {return Promise.reject()};

        return responseObject;
    });
};

const selectCommentsByArticleId = (articleId) => {
    const sqlQueryParameters = [Number(articleId)];
    const sqlQuery = `SELECT comment_id, author, created_at, body, votes FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`;

    return db.query(sqlQuery, sqlQueryParameters).then((selectCommentsByArticleIdOutput) => {
        const responseObject = {timestamp: ts};
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

    const sqlQuery = `SELECT articles.*, CAST(COUNT(comments.*) AS int) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY created_at DESC;`;

    return db.query(sqlQuery).then((selectArticleByArticleIdQueryResult) => {
        let articleOutput =  selectArticleByArticleIdQueryResult.rows;
        const filterArticleOutput = function (element) {
            if (Number(element["article_id"]) === securedArticleId) {
                return element;
            };
        };
       articleOutput = articleOutput.filter(filterArticleOutput);

        const objectOutput = articleOutput[0];
  
        if (objectOutput) {
            
            return objectOutput;
        } else {
            return Promise.reject();
        };

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
        const responseObject = {comment: insertCommentByArticleIdResult.rows[0], timestamp: ts};
        return responseObject;
        } else {
            return Promise.reject({errcode: 404});
        };
    });   

};

const updateArticleVotesByArticleId = (articleId, incVotesObject) => {
    const numArticleId = Number(articleId);
    const incVotes = Number(incVotesObject["inc_votes"]);

    const sqlQueryParameters = [incVotes, numArticleId];
    const sqlQuery = `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`;

    return db.query(sqlQuery, sqlQueryParameters).then((updateArticleVotesByArticleIdResult) => {
        const updatedArticle = updateArticleVotesByArticleIdResult.rows[0];
        const responseObject = {article: updatedArticle, timestamp: ts};
        return responseObject;
    });   


}

const selectUsers = () => {
    const sqlQuery = `SELECT * FROM users ORDER BY username ASC;`;

    return db.query(sqlQuery).then((selectUsersResult) => {
        const responseObject = {users: selectUsersResult.rows, timestamp: ts};
        return responseObject;
    });   

};


// is it ok to have this named the same as the corresponding controller function? i thought its okay cause they are in different files and always referred to like model.comments.deleteCommentByCommentId
const deleteCommentByCommentId = (commentId) => {
    const sqlQuery = `DELETE FROM comments WHERE comment_id = $1 RETURNING *;`;
    const sqlQueryParameters = [commentId];

    return db.query(sqlQuery, sqlQueryParameters).then((result) => {
        if (result.rows[0]) {
            return;
        } else {
            return Promise.reject();
        }
    });   

};





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
        insertCommentByArticleId, 
        deleteCommentByCommentId
    },
    users: {
        selectUsers
    }
};
