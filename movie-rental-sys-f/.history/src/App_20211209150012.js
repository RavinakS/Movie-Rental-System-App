import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Homepage from './Components/users/homepage/homepage';
import Login from './Components/users/login/login';
import Signup from './Components/users/signup/signup';
import UserMoviepage from './Components/movies/user/userMoviePage';
import ErrorPage from './Components/users/homepage/errorPage';
import AdminMoviepage from './Components/movies/admin/adminMoviePage';
import Protected from './Protected';

export default function App() {

  return (
   <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/create-account' element={<Signup />} />
          <Route path='/login' element={<Login />} />

          <Route 
            path='/user-movie-page'
            element = {}
            <Protected Cmp={UserMoviepage} />
          />

          <Route 
            path='/admin-movie-page' 
            element={
              <Protected Cmp={AdminMoviepage} />
            } 
          />

          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

