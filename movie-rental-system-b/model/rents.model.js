const db = require('./dbConnection.model');

const Schema = db.Schema;
const Model = db.model;

const rentsTableSchema = new Schema({
    user: {type: String},
    name: {type: String},
    releasDate: {type: Date},
    genre: {type: String},
    avalCD: {type: Number},
    movie_id: {type: Schema.Types.ObjectId, ref:'movies'},
    user_id: {type: Schema.Types.ObjectId, ref:'users'}
})

exports.rents = Model('rents', rentsTableSchema);
