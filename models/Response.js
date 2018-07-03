//require mongoose to work with mongoDB
let mongoose = require('mongoose');

// Tell mongoose what we will write to database (Params from site on task)
let ResponseSchema = new mongoose.Schema({
    args: {
        arg1: String
    },
    headers: {
        connection: String,
        host: String
    },
    origin: String,
    url: String
});

//Set model to mongoose
let model = mongoose.model('response', ResponseSchema);

//and export model to use it from another JS files
module.exports = model;