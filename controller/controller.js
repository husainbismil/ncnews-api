// c = controller, m = model, v = view, db = database
const model = require("../model/model");

// TODO: find out how error catching is meant to be, repeating .catch here seems not very DRY

// /api/topics Endpoints
exports.getApiTopics = (request, response) => {
    model.selectTopics().then((selectTopicsResponseObject) => {
        response.status(200).send(selectTopicsResponseObject);
    }).catch((err) => {
        console.log(err);
    });
};

// TODO: find out how error catching is meant to be, repeating .catch here seems not very DRY
    
