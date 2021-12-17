const {avalRentsMovieByName, getMovieByName, updateMovieRents} = require('../services/movies.services');
const {userDetailsById, updateUserRent} = require('../services/users.services');
const {addRent, findRentsByUserID, findRentsByMovieName} = require('../services/rents.services');
const {error_messages, responses} = require('./utils/constants');

// Buy a movie
exports.buyMovie = async (req, res) =>{
    let movieName = req.body.name;
    let auth_data = req.user;
    if(movieName === undefined){
        return res.status(400).send(error_messages.required);
    }

    try{
        // is movie available
        let availableRents = await avalRentsMovieByName(movieName);
        if(availableRents === null){
            return res.status(404).send(error_messages.not_exist);
        }
        
        // if yes? is it is available for rent
        if(availableRents.avalCD > 0){

            // if user have not taken rent already for this movie, add the movie with user's email to rents table
            if(!req.movieRentExist){
                movie_details = await getMovieByName(movieName);
                user_details = await userDetailsById(auth_data.email);
                console.log("movies", movie_details._id);
                console.log("users", user_details[0]._id);
                if(movie_details === null){
                    return res.status(404).send(error_messages.not_exist);
                } 
                console.log("03030330")

                let rent_details = {
                    user_id: user_details[0]._id,
                    user: auth_data.email,
                    name: movie_details.name,
                    releasDate: movie_details.releasDate,
                    genre: movie_details.genre,
                    avalCD: movie_details.avalCD,
                    movie_id: movie_details._id
                };

                console.log("0909090909")

                added = await addRent(rent_details);

                console.log("09090909099999999999999999999")


                // update the rent field of the user to +1
                total_rents = auth_data.rent + 1;
                updateUserRentStatus = await updateUserRent(auth_data.email, total_rents);

                // update available CDs
                update_movie_rents = await updateMovieRents(movie_details.name, -1)

                return res.status(200).send(responses.succeeded);
            }
            return res.status(403).send(error_messages.al_exist);
        }
        res.status(503).send(error_messages.server_err_down_mtnce);

    }catch(err){
        console.log(err);
        res.send(err);
    }

}

// view a particular user's rents details
exports.viewUserRents = async (req, res) =>{
    user_id = req.body.email;
    if(user_id === undefined){
        return res.status(400).send(error_messages.required);
    }
    try{
        if(!req.admin){
            return res.status(401).send(error_messages.un_authorized);
        }
        getUserDetails = await userDetailsById(user_id); 
        if(getUserDetails.length === 0){
            return res.status(404).send(error_messages.not_exist);
        }else if(getUserDetails[0].rent === 0){
            return res.status(200).send({status_code: 200, rents: "0 rents."})
        }
        all_rents = await findRentsByUserID(user_id);
        res.status(200).send({status_code: 200, No_of_rents: `${getUserDetails[0].rent}`, rents: all_rents});
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

exports.viewMovieRents = async (req, res) =>{
    try{
        let movie_name = req.params.name;
        let getRentsDetails = await findRentsByMovieName(movie_name);        
        if(getRentsDetails.length === 0){
            res.status(404).send({status_code: 404, message: "No Rents"});
        }else{
            console.log(getRentsDetails);
            return res.status(200).send(getRentsDetails);
        }
    }catch(err){
        console.log(err);
        res.send(err);
    }
}