const {verifyToken} = require('./utils/token');

exports.get_token = async (req, res) =>{
    let token = req.headers.cookie.split('=')[1];
    userInfo = await verifyToken(token);

    if(userInfo === 'err'){
        return res.json("noToken");
    }
    user_role = userInfo.role.toLowerCase();
    if(user_role === 'admin'){
        return res.json(true);
    }else{
        console.log("Hello");
        return res.json(false);
    }
}