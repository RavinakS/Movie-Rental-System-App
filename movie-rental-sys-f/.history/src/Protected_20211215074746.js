import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;






























































// import React, { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router";
// import { useCookies } from "react-cookie";

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
            return {};
        }
    })

    return (
        <div>
            <CMp/>
        </div>
    )
};