import { useNavigate } from "react-router";
let navigate = useNavigate();

export default Protected = (isLogedIn) => [
    {
        path: "/", 
        element: isLogedIn? <Homepage /> 
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



























































