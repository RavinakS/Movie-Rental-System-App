import React from 'react';
import {BrowserRouter, Routes, Route, Link, useRoutes} from 'react-router-dom';
import { useCookies } from "react-cookie";

import Homepage from './Components/users/homepage/homepage';
import Login from './Components/users/login/login';
import Signup from './Components/users/signup/signup';
import UserMoviepage from './Components/movies/user/userMoviePage';
import ErrorPage from './Components/users/homepage/errorPage';
import AdminMoviepage from './Components/movies/admin/adminMoviePage';
import Logout from './Components/users/logout/logout';
// import Protected from './Protected';

export default function App() {

  async function islogedIn(){
    let [token, setToken] = useCookies(['token']);

    setToken('token', token);

    try{
      let isToken = await axios.post('/get-token', {headers: {cookie: token}})
      if(isToken.data === 'noToken'){
          return {token: false, user: false};
      }
      else if(isToken.data === true){
          return {token: true, user: true};
      }else{
          return {token: true, user: false};
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div>
        <CMp/>
    </div>
  )
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
}

