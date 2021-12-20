import React from "react";
import { Navigate , Outlet } from "react-router-dom";

export default ProtectedRoute = () => {
    const role = localStorage.getItem('role')

    return (role === "AdmIn") ? <Outlet /> : <Navigate to="/user-movie-page" />;
}

export default IsAuthenticated = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    return isAuthenticated ? < Navigate to={} /> : <Outlet />
}

























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



























































