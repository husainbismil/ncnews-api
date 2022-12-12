// c = controller, m = model, v = view, db = database
const m = require("../model/model");

// TODO: find out how error catching is meant to be, repeating .catch here seems not very DRY

// /api/topics Endpoint
exports.getApiTopics = (request, response) => {
    m.selectTopics().then((queryResult) => {
        const responseArray = queryResult.rows;
        response.status(200).send(responseArray);
    }).catch((err) => {
        console.log(err);
    });
};

// TODO: find out how error catching is meant to be, repeating .catch here seems not very DRY
    
