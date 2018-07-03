//require all modules that we need to corect work
let express = require('express');
//https to work with https protocols
let https = require('https');
//require middleware.js
let loggerMiddleware = require('./middleware').logger;
//require mongoose to work with mongodb
let mongoose = require('mongoose');
let ResponseModel = require('./models/Response');

//Set global promise to ,mongoose. Because console log error that non global is depricated
mongoose.Promise = global.Promise;
//connect mongoose to out database
mongoose.connect('mongodb://localhost/responsedb');

let app = express();
//call middleware with methods GET POST etc.
app.use(loggerMiddleware(['GET', 'POST', 'PUT', 'DELETE']));
// If we have GET method we will use this method
app.get('/', function (req, res, next) {
    https.get('https://httpbin.org/get?arg1=val', function (resClient) {
        let body = "";
        //If we have data, we write data of page to body
        resClient.on("data", data => {
            body += data;
        });
        //parse page body to JSON and create model from file Response.js
        resClient.on("end", () => {
            body = JSON.parse(body.toLowerCase());
            ResponseModel.create(body, function (err, doc) {
                res.json(doc);
            });

        });
        //If we have some error - log this error to console
        resClient.on("error", (err) => {
            console.log(err);
        });
    });
});

//If we have another method we will use once of this methods and in res.end()
//we will send what method we have
app.post('/', function (req, res, next) {
    res.end('POST method');
});
app.put('/', function (req, res, next) {
    res.end('PUT method');
});
app.delete('/', function (req, res, next) {
    res.end('DELETE method');
});

//Catch reqeust to unknown URL and send 404 status
app.use((req, res, next) => {
    res.sendStatus(404);
});

//Tell application on what port we want work on localhost
app.listen(3000, () => {
    console.log('3000');
});