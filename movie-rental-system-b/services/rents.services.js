const { rents } = require('../model/rents.model');

exports.addRent = (movie_rent_data) =>{
    console.log( movie_rent_data);
    return rents.create(movie_rent_data);
}

exports.findRentsByMovieName = (m_name) =>{
    return rents.find({name: m_name}).populate('user_id').populate('movie_id');
}

exports.findRentsByUserID = (user_id) =>{
    return rents.find({user: user_id})
}
