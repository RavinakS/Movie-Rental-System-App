import axios from "axios";
import { useNavigate } from "react-router";

export default function async Logout(){
    let navigate = useNavigate();

    let res = await axios.get("/logout");

    alert(res);
    
    navigate('/login');
};

