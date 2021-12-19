import React from "react";
import { Navigate , Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const ProtectedRoute = () => {

    let [user, setToken] = useCookies(['userDetails']);
    setToken('userDetails', isAuthenticated);
    // console.log(token, "**********");
    // let isLoggedIn = localStorage.getItem("token");

    async function isLoggedIn(){

        try{
            let isToken = await axios.post('/get-token', {headers: {cookie: token}})
            // console.log(isToken.data, "MMMMMMMMMMMMMMMMMMm");
            if(isToken.data === 'noToken'){
                console.log("no token");
                // return setToken('token', false);
                return {token: false, user: false};
            }
            else if(isToken.data === true){
                console.log("admin");
                // setToken('token', true);
                return {token: true, user: true};
            }else{
                console.log("user");
                // setToken('token', false);
                return {token: true, user: false};
            }
        }catch(err){
            console.log(err);
        }
    }


//   const isAuthenticated = localStorage.getItem("isAuthenticated");
//   console.log("this", isAuthenticated);
    
    let res = isLoggedIn()
    console.log(res);
    // console.log(res);
    // if(res.token && res.user){
    //     console.log("You are here.");
    //     return <Outlet />
    // }else if(res.token){
    //     return <Navigate to="/user-movie-page" />
    // }else{
    //     return <Navigate to="/login" />
    // }
    
    return res.token ? <Outlet /> : <Navigate to="/user-movie-page" />;
}

export default ProtectedRoute;

























// import React from 'react';
// // import { useNavigate } from "react-router";
// // import {BrowserRouter, Routes, Route, Link, useRoutes} from 'react-router-dom';

// import Homepage from './Components/users/homepage/homepage';
// import Login from './Components/users/login/login';
// import Signup from './Components/users/signup/signup';
// import UserMoviepage from './Components/movies/user/userMoviePage';
// import ErrorPage from './Components/users/homepage/errorPage';
// import AdminMoviepage from './Components/movies/admin/adminMoviePage';
// import Logout from './Components/users/logout/logout';

// export default function Protected(isLogedIn){
//     // let navigate = useNavigate();

//     return [
//         {
//             path: "/", 
//             element: <Homepage />
//         },
//         {
//             path: '/login',
//             element: <Login />,
//             // children: [
//             //     {
//             //         path: '/user-movie-page',
//             //         element: <UserMoviepage />
//             //     },
//             //     {
//             //         path: '/admin-movie-page',
//             //         element: <AdminMoviepage />
//             //     }
//             // ]
//         },
//         {
//             path: '/create-account',
//             element: <Signup />
//         },
//         {
//             path: '/user-movie-page',
//             element: isLogedIn.token ? <UserMoviepage /> : <UserMoviepage />
//         },
//         {
//             path: '/admin-movie-page',
//             element: (isLogedIn.token && isLogedIn.user) ? <AdminMoviepage /> : <UserMoviepage /> 
//         },
//         {
//             path: '/logout',
//             element: <Logout />
//         },
//         {
//             path: '*',
//             element: <ErrorPage />
//         }
//     ]
// }

// return (
//  <>
//     <BrowserRouter>
//       <nav>
//         <Link to={'/logout'}>Logout</Link>
//         <Link to={'/'}>Home</Link>
//       </nav>
//       <Routes>
//         <Route path="/" element={<Homepage />} />

//         <Route 
//           path='/create-account' 
//           element={ <Signup />}
//         />

//         <Route 
//           path='/login' 
//           element={<Login />} 
//         />

//         <Route 
//           path = '/logout'
//           element = {<Logout />}
//         />

//         <Route 
//           path='/user-movie-page'
//           element = {<UserMoviepage />}
//         />

//         <Route 
//           path='/admin-movie-page' 
//           element={<AdminMoviepage />} 
//         />

//         <Route path='*' element={<ErrorPage />} />
//       </Routes>
//     </BrowserRouter>
//   </>
// );


























































