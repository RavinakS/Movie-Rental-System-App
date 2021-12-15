import { useNavigate } from "react-router";
// let navigate = useNavigate();

import Homepage from './Components/users/homepage/homepage';
import Login from './Components/users/login/login';
import Signup from './Components/users/signup/signup';
import UserMoviepage from './Components/movies/user/userMoviePage';
import ErrorPage from './Components/users/homepage/errorPage';
import AdminMoviepage from './Components/movies/admin/adminMoviePage';
// import Logout from './Components/users/logout/logout';

export default Protected = (isLogedIn) => [
    {
        path: "/", 
        element: <Homepage />
    },
    {
        path: '/login',
        element: <Login />,
        // children: [
        //     {
        //         path: '/user-movie-page',
        //         element: <UserMoviepage />
        //     },
        //     {
        //         path: '/admin-movie-page',
        //         element: <AdminMoviepage />
        //     }
        // ]
    },
    {
        path: '/create-account',
        element: <Signup />
    },
    {
        path: '/user-movie-page',
        element: isLogedIn.token ? <UserMoviepage /> : <UserMoviepage />
    },
    {
        path: '/admin-movie-page',
        element: (isLogedIn.token && isLogedIn.user) ? <AdminMoviepage /> : <UserMoviepage /> 
    },
    
    {
        path: '*',
        element: <ErrorPage />
    }
]

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



























































