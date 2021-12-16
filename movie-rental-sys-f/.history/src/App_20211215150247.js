import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import Homepage from './Components/users/homepage/homepage';
import Login from './Components/users/login/login';
import Signup from './Components/users/signup/signup';
import UserMoviepage from './Components/movies/user/userMoviePage';
import ErrorPage from './Components/users/homepage/errorPage';
import AdminMoviepage from './Components/movies/admin/adminMoviePage';
import Logout from './Components/users/logout/logout';
import Protected from './Protected';

export default function App() {

  return (
   <>
      <Router>
        <nav>
          <Link to={'/logout'}>Logout</Link>
          <Link to={'/'}>Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route 
            path='/create-account' 
            element={ <Signup />}
          />

          <Route 
            path='/login' 
            element={<Login />} 
          />

          <Route 
            path = '/logout'
            element = {<Logout />}
          />

          <Route 
            path='/user-movie-page'
            element = {<UserMoviepage />}
          />

          {/* <Route path='/admin-movie-page' element={<Protected/>}> */}
            <Route  path='/admin-movie-page' element={<AdminMoviepage />}/>
          {/* </Route> */}

          {/* <Route 
            path='/admin-movie-page' 
            element={<AdminMoviepage />} 
          /> */}

          <Route
            path='/movies/add-movie'
            element = {}
          
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
