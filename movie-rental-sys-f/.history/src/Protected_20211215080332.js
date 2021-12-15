

import { useNavigate } from "react-router";

export default function Protected(props){

    let [token, setToken] = useCookies(['token']);

    setToken('token', token);

    axios.post('/get-token', {headers: {cookie: token}})
    .then((res)=>{
        if(res.data === 'noToken'){
            return {token: false, user: false};
        }
        else if(res.data === true){
            return {token: true, user: true};
        }else{
            return {token: true, user: false};
        }
    })

    return (
        <div>
            <CMp/>
        </div>
    )
};





























































