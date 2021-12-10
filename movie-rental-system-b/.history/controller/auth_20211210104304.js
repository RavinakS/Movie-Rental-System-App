const {verifyToken} = require('./utils/token');

exports.get_token = async (req, res) =>{
    let token = req.headers.cookie.split('=')[1];
    userInfo = await verifyToken(token);

    if(userInfo === 'err'){
        return res.send("noToken");
    }
    user_role = userInfo.role.toLowerCase();
    if(user_role === 'admin'){
        return res.send(true);
    }else{
        console.log("Hello");
        return res.send(false);
    }
}