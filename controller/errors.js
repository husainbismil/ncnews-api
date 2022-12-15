exports.res404 = {error: "Error 404 File Not Found"};

exports.fileNotFound = (req, res) => {
    // Error 404 Handler
    res.status(404).send({error: "Error 404! File Not Found"});
};

exports.psqlErrorHandling = (err, req, res, next) => {
    const ec = err.code.slice(0, 2);
    if (err.code.slice(0, 4) === "2350") {
      // 404 - Integrity Constraint Violation
      res.status(404).send({ error: "Error 404! File Not Found" });
    } else if (ec.slice(0, 1) === "2" || ec.toLowerCase() === "42") {
      // 400 - Data Exception OR invalid SQL
      // 400 - Handle Syntax Errors / Access Rule Violations
      res.status(400).send({ error: "Error 400! BAD REQUEST" });
    } else if (ec === "53" || ec === "54" || ec === "57") {
      // Handle Internal Server Errors
      res.status(500).send({ error: "Error 500 - Internal Server Error" });
    } else {
      next(err);
    }
};

exports.testNext404 = (err, req, res, next) => {
    res.status(404).send({error: "Error 404! File Not Found"});
};

exports.testNext400 = (err, req, res, next) => {
    res.status(400).send({error: "Error 400! BAD REQUEST"});
};