import axios from "axios";
import { useNavigate } from "react-router";

export default function asy Logout(){
    let navigate = useNavigate();

    let res = await axios.post("/logout", user);
    
    navigate('/login');
};

