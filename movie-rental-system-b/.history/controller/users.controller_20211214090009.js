const {signUp, userDetailsById, profile, allUsersData} = require('../services/users.services');
const {createToken, verifyToken} = require('./utils/token');
const {error_messages, responses} = require('./utils/constants');

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
            res.status(201).json(responses.succeeded);
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
        console.log(req.headers.cookie);
        console.log("I am after cookie");

        userInfo = await verifyToken(token);
        res.cookie('token', '', { maxAge: 0 });
        res.status(200).json("Bye Bye!!");

    }catch(err){
        res.send("You are not looged in.");
    }
}

exports.user_profile = async (req, res) =>{
    try{
        let token = req.headers.cookie.split('=')[1];
        tokenData = await verifyToken(token);
        userInfo = await profile(tokenData.email);
        if(userInfo.length === 0){
            return res.status(404).json(error_messages.login_page);
        }
        res.status(200).json({status_code: 200, data: userInfo})
    }catch(err){
        res.send(err);
    }
}

exports.allUsersInfo = async (req, res) =>{
    try{
        if(!req.admin){
            return res.status(401).json(error_messages.un_authorized);
        }
        usersData = await allUsersData();
        res.status(200).json({status_code: 200, data: usersData});
    }catch(err){
        res.send(err);
    }
}
