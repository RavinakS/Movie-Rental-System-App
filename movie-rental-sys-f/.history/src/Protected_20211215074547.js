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
            return ;
        }
        else if(res.data === true){
            return navigate('/admin-movie-page');
        }else{
            return navigate('/user-movie-page');
        }
    })

    return (
        <div>
            <CMp/>
        </div>
    )
};