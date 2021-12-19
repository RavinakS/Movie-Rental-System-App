import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

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
import Protected from './Protected';

export default function App() {

  return (
   <>
      <Router>
      {/* <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand">Navbar</a>
        <form class="form-inline">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav> */}
        <nav class="navbar navbar-light bg-light">
          <Link to={'/logout'}>Logout</Link>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          <Link to={'/'}>Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path='/create-account' element={ <Signup />} />

          <Route path='/login' element={<Login />} />

          <Route path = '/logout' element = {<Logout />} />

          <Route path='/user-movie-page' element = {<UserMoviepage />}/>
        
          <Route path='/admin-movie-page' element={<Protected/>}>
            <Route  path='/admin-movie-page' element={<AdminMoviepage />}/>
          </Route>

          <Route path='/movies/add-movie' element = {<Addmovie />} />

          <Route path='/movies/update-movie' element = {<UpdateMovie />} />

          <Route path='/rent-details' element = {<MovieRentsDetails />} />

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
