const model = require("../model/model");

// /api/topics Endpoint
exports.getApiTopics = (req, res) => {
    const array = [{slug: "blah", description: "blah"}];
    res.status(200).send(array);
};