const {signUp, userDetailsById, profile, allUsersData} = require('../services/users.services');
const {createToken, verifyToken} = require('./utils/token');
const {error_messages, responses} = require('./utils/constants');
const { findRentsByUserID } = require('../services/rents.services');

exports.sign_up = async (req, res) =>{
    try{
        userInfo = req.body;
        userInfo["password"] = req.hashPass;

        signUpStatus = await signUp(userInfo);

        tokenData = {
            email: userInfo.email,
            role: userInfo.role
        }
        createdToken = await createToken(tokenData);
        
        res.cookie('token', createdToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 356
        });
        
        res.status(201).json(responses.succeeded);
        
    }catch(err){
        if(err.name === "MongoServerError" && err.code === 11000){
            return res.status(403).json(error_messages.al_exist);
        }
        
        res.send(err);
    }
}


exports.login = async (req, res)=>{
    try{
        if(req.validPassword === "noUser"){
            return res.status(404).json(error_messages.not_exist);

        }else if(req.validPassword){
            userData = await userDetailsById(req.body.email);
            tokenData = {
                email: userData[0].email,
                role: userData[0].role
            }
            createdToken = await createToken(tokenData);
            res.cookie('token', createdToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 356
            });

            console.log("Logged is SuccessFully.");
            res.status(200).json(tokenData);
        }else{
            console.log(error_messages.wrong_pass);
            res.status(400).json(error_messages.wrong_pass);
        }

    }catch(err){
        res.send(err);
    }
    
}

exports.logout = async (req, res) => {
    try{
        let token = req.headers.cookie.split('=')[1];
        tokenLength = token.length;

        let check = token[tokenLength-3] + token[tokenLength-2] + token[tokenLength-1];
        if(check === '%7D'){
            res.cookie('token', '', { maxAge: 0, withCredentials: true });
            res.status(404).send("You are not looged in.")
            // res.send("You are not looged in.");
            return;
        }
        userInfo = await verifyToken(token);
        res.cookie('token', '', { maxAge: 0, withCredentials: true });
        res.status(200).json("Bye Bye!!");

    }catch(err){
        console.log(err);
    }
}

exports.user_profile = async (req, res) =>{
    try{
        let token = req.headers.cookie.split('=')[1];
        tokenData = await verifyToken(token);

        userInfo = await profile(tokenData.email);

        userRents = await findRentsByUserID(tokenData.email);

        let view_profile = []
        if(userInfo.length != 0){
            if(userRents.length != 0){
                view_profile.push(userInfo)
                view_profile.push(userRents)
                return res.status(200).json({view_profile});
            }else{
                return res.status(200).json(userInfo);
            }
        }else{
        res.status(404).json("no_user");
        }
        
    }catch(err){
        res.send(err);
    }
}

exports.allUsersInfo = async (req, res) =>{
    try{
        usersData = await allUsersData();
        res.status(200).json(usersData);
    }catch(err){
        res.send(err);
    }
}
