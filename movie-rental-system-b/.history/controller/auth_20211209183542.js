const {verifyToken} = require('./utils/token');

exports.get_token = async (req, res) =>{
    let token = req.headers.cookie.split('=')[1];
    userInfo = await verifyToken(token);

    if(userInfo === 'err'){
        res.send("noToken");
        return;
    }
    user_role = userInfo.role.toLowerCase();
    if(user_role === 'admin'){
        res.send(true);
        return;
    }else{
        log
        res.send(false);
        return;
    }
}