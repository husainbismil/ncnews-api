const model = require("../model/model");

// TODO: find out how error catching is meant to be, repeating .catch here seems not very DRY
// TODO: set up routers to make this stuff look cleaner

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
    // TODO: instead of doing this for every articles request, find way to just store comment count in the db and keep it updated, that way theres no need to calculate it each time
    model.selectArticles().then((selectArticlesQueryResultArray) => {

        const articleIdArray = selectArticlesQueryResultArray[0];
        const articlesArray = selectArticlesQueryResultArray[1];
        // articleIdArray is now built.

        // query comments, get all comments that match those article Ids, store them in an array returnedCommentsArray
        model.selectCommentsByArticleId(articleIdArray, articlesArray).then((responseObject) => {

            // respond with the updatedArticlesArray            
            response.status(200).send(responseObject);
            
        });

    });
};


// TODO: find out how error catching is meant to be, repeating .catch here seems not very DRY
    
