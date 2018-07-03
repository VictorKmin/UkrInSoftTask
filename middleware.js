//require FileSystem module
let fs = require('fs');

//to use method from another js files we need to export this
exports.logger = function (methods) {
    return function (req, res, next) {
        //If we have parameters in function indexOf must have some value
        if (methods.indexOf(req.method) > -1) {
            //Write parameters that user send to server in parsedRequest object
            const parsedRequest = {
                // Parameters from request that we want write on file
                hostname: req.hostname,
                url: req.url,
                method: req.method,
                ip: req.ip,
            };
            //Do JSON format from parsedRequest object. Than write it to file
            const parsedRequestJSON = JSON.stringify(parsedRequest);
            //call writeFile function with body like JSON object
            writeFile(parsedRequestJSON)
                .then(function (ok) {
                    console.log(ok);
                })
                //If we have error log this error to console
                .catch(function (err) {
                    console.log(err);
                });
        }
        next();
    }
};

//Write str to file ./log.txt. If present flag 'a' will create file if not exist
function writeFile(str) {
    str += '\n';
    return new Promise(function (resolve, reject) {
        fs.appendFile('./log.csv', str, {flag: 'a'}, function (err) {
            if (err)
                //If we have errors, log to console this error
                reject(err);
            //If OK, write to console OK
            resolve('Ok');
        })
    });
}