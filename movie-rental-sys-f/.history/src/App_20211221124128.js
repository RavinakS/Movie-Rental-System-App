import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Homepage from './Components/users/homepage/homepage';
import Login from './Components/users/login/login';
import Signup from './Components/users/signup/signup';
import UserMoviepage from './Components/movies/user/userMoviePage';
import ErrorPage from './Components/users/homepage/errorPage';
import AdminMoviepage from './Components/movies/admin/adminMoviePage';
import Logout from './Components/users/logout/logout';
import Addmovie from './Components/movies/admin/addMovie/addMovie';
import UpdateMovie from './Components/movies/admin/updateMovie/updateMovie';
import MovieRentsDetails from './Components/movies/admin/rents/rents';
import UserProfile from './Components/movies/user/profile/profile';
import Protected from './Protected';
import AllUsers from './Components/movies/admin/allUsers/allUsers';
import IsAuthenticated from './Auth';

export default function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState("");

  return (
   <>
      <Router>
      <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
        <div class="collapse navbar-collapse">
            {navButtons()}
          </div>
      </nav>
        
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path='/create-account' element={ <Signup />} />

          <Route path='/login' element={<IsAuthenticated/>}>
            <Route path='/login' element={<Login />} />
          </Route>

          <Route path = '/logout' element = {<Logout />} />

          <Route path = '/profile' element = {<UserProfile />} />

          <Route path='/user-movie-page' element = {<UserMoviepage />}/>
        
          <Route path='/admin-movie-page' element={<Protected/>}>
            <Route  path='/admin-movie-page' element={<AdminMoviepage />}/>
          </Route>

          <Route path='/movies/add-movie' element={<Protected/>}>
            <Route path='/movies/add-movie' element = {<Addmovie />} />
          </Route>

          <Route path='/movies/update-movie' element={<Protected/>}>
            <Route path='/movies/update-movie' element = {<UpdateMovie />} />
          </Route>

          <Route path='/rent-details' element={<Protected/>}>
            <Route path='/rent-details' element = {<MovieRentsDetails />} />
          </Route>

          <Route path='/users' element={<Protected/>}>
            <Route path='/users' element= {<AllUsers/>} />
          </Route>

          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}





































// export default function App() {
//   let [token, setToken] = useCookies(['token']);
//   setToken('token', token);
//   // let isLoggedIn = localStorage.getItem("token");

//   async function isLoggedIn(){

//     try{
//       let isToken = await axios.post('/get-token', {headers: {cookie: token}})
//       if(isToken.data === 'noToken'){
//           return {token: false, user: false};
//       }
//       else if(isToken.data === true){
//           return {token: true, user: true};
//       }else{
//           return {token: true, user: false};
//       }
//     }catch(err){
//       console.log(err);
//     }
//   }

//   const routing = useRoutes(Protected(isLoggedIn));
//   return (
//     <>
//       <BrowserRouter>
//           {routing}
//       </BrowserRouter>
//     </>
//   );
// }
