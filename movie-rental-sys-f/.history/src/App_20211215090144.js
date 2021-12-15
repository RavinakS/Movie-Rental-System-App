import React from 'react';
import {BrowserRouter, Routes, Route, Link, useRoutes} from 'react-router-dom';
import { useCookies } from "react-cookie";
import axios from "axios";

import Protected from './Protected';

export default function App() {
  let [token, setToken] = useCookies(['token']);
  setToken('token', token);

  async function isLoggedIn(){

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

  const routing = useRoutes( Protected(isLoggedIn) );
  return (
    <>
      <BrowserRouter></BrowserRouter>
      {routing}
    </>
  );
}

