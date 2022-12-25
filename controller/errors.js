exports.res404 = {status: 404, error: "Error 404 File Not Found", details: "response 404"};

exports.pte = {status: 404, tip: "Go to /api/ to view all endpoints.", url: "https://ncnews-server.onrender.com/api/"};

exports.fileNotFound = (req, res) => {
    // Error 404 Handler
    res.status(404).send({status: 404, error: "Error 404! File Not Found"});
};

exports.psqlErrorHandling = (err, req, res, next) => {
    const ec = err.code.slice(0, 2);

    if (err.statcode === 400 || err.code === "23502" || err.code === "23503") {
        res.status(400).send({ status: 400, error: "Error 400! BAD REQUEST (Code 1)" });
    } else if (err.statcode === 404) {
        res.status(404).send({ status: 404, error: "Error 404! File Not Found"});
    } else if (err.code.slice(0, 4) === "2350") {
      // 404 - Integrity Constraint Violation
      res.status(400).send({ status: 400, error: "Error 400! BAD REQUEST  (Code 2)" });
    } else if (ec.slice(0, 1) === "2" || ec.toLowerCase() === "42" || ec === "22") {
      // 400 - Data Exception OR invalid SQL
      // 400 - Handle Syntax Errors / Access Rule Violations
      res.status(400).send({ status: 400, error: "Error 400! BAD REQUEST  (Code 3)", details: err });
    } else if (ec === "53" || ec === "54" || ec === "57") {
      // Handle Internal Server Errors
      res.status(500).send({ status: 500, error: "Error 500 - Internal Server Error" });
    } else {
      next(err);
    }
};

exports.testNext404 = (err, req, res, next) => {
    res.status(404).send({status: 404, error: "T / Error 404! File Not Found"});
};

exports.testNext400 = (err, req, res, next) => {
    res.status(400).send({status: 400, error: "T / Error 400! BAD REQUEST"});
};
