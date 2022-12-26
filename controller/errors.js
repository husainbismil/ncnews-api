const homeurl = "https://ncnews-server.onrender.com/api/";
const ts = new Date().toISOString();
const template = {status: 0, error: "", timestamp: ts, home: homeurl};

exports.res404 = {status: 404, timestamp: ts, error: "Error 404 File Not Found", details: "response 404"};

exports.pte = {status: 404, timestamp: ts, tip: "Go to /api/ to view all endpoints.", url: homeurl};


exports.fileNotFound = (req, res) => {
    // Error 404 Handler
    let e = {...template};
    e.status = 404;
    e.error = "Error 404! File Not Found";
    res.status(404).send(e);
};

exports.psqlErrorHandling = (err, req, res, next) => {
    const ec = err.code.slice(0, 2);
    const e = {...template};

    if (err.statcode === 400 || err.code === "23502" || err.code === "23503") {
        e.status = 400;
        e.error = "Error 400! BAD REQUEST (Code 1)";
        res.status(400).send(e);
    } else if (err.statcode === 404) {
        e.status = 404;
        e.error = "Error 404! File Not Found";
        res.status(404).send(e);
    } else if (err.code.slice(0, 4) === "2350") {
        // 404 - Integrity Constraint Violation
        e.status = 400;
        e.error = "Error 400! BAD REQUEST  (Code 2)";
        res.status(400).send(e);
    } else if (ec.slice(0, 1) === "2" || ec.toLowerCase() === "42" || ec === "22") {
        // 400 - Data Exception OR invalid SQL
        // 400 - Handle Syntax Errors / Access Rule Violations
        e.status = 400;
        e.error = "Error 400! BAD REQUEST  (Code 3)";
        res.status(400).send(e);
    } else if (ec === "53" || ec === "54" || ec === "57") {
        // Handle Internal Server Errors
        e.status = 500;
        e.error = "Error 500 - Internal Server Error";
        res.status(500).send(e);
    } else {
        next(err);
    }
};

exports.testNext404 = (err, req, res, next) => {
    res.status(404).send({status: 404, timestamp: ts, error: "T / Error 404! File Not Found", home: homeurl});
};

exports.testNext400 = (err, req, res, next) => {
    res.status(400).send({status: 400, timestamp: ts, error: "T / Error 400! BAD REQUEST"});
};
