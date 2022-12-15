exports.res404 = {error: "Error 404 File Not Found"};

exports.fileNotFound = (req, res) => {
    // Error 404 Handler
    res.status(404).send({error: "Error 404! File Not Found"});
};

exports.testNext404 = (err, req, res, next) => {
    res.status(404).send({error: "Error 404! File Not Found"});
};

exports.testNext400 = (err, req, res, next) => {
    res.status(400).send({error: "Error 400! BAD REQUEST"});
};