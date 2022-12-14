exports.fileNotFound = (req, res) => {
    // Error 404 Handler
    res.status(404).send({error: "<strong>Error 404</strong> File Not Found"});
};