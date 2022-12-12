// c = controller, m = model, v = view, db = database
const db = require("../db/connection.js");
const c = require("../controller/controller.js");

exports.selectTopics = () => {
    return db.query("SELECT * FROM topics").then((queryResult) => {
        return queryResult;
    });
  };