import './App.css';
import React from 'react';

import Homepage from './Components/users/homepage/homepage';
import Login from './Components/users/login/login';
import Signup from './Components/users/signup/signup';

function App() {
  return (
    <div className="App">
      {/* <Homepage /> */}
      {/* <Login /> */}
      <Signup />
    </div>
  );
}

export default App;
