import React from "react";
import { Navigate , Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const ProtectedRoute = () => {

    let [token, setToken] = useCookies(['token']);
    // setToken('token', token);
    // let isLoggedIn = localStorage.getItem("token");

    async function isLoggedIn(){

        try{
            let isToken = await axios.post('/get-token', {headers: {cookie: token}})
            if(isToken.data === 'noToken'){
                setToken('token', false);
                return {token: false, user: false};
            }
            else if(isToken.data === true){
                setToken('token', true);
                return {token: true, user: true};
            }else{
                setToken('token', false);
                return {token: true, user: false};
            }
        }catch(err){
            console.log(err);
        }
    }


//   const isAuthenticated = localStorage.getItem("isAuthenticated");
//   console.log("this", isAuthenticated);
    isLoggedIn()
    .then((res)=>{
        return (res.token ? <Outlet /> : <Navigate to="/" />;
    })
    console.log("You are here.");
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



























































