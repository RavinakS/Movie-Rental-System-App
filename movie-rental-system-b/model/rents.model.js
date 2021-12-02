const db = require('./dbConnection.model');

const Schema = db.Schema;
const Model = db.model;

const rentsTableSchema = new Schema({
    user: {type: String},
    name: {type: String},
    releasDate: {type: Date},
    genre: {type: String},
    avalCD: {type: Number}
})

exports.rents = Model('rents', rentsTableSchema);
