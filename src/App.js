import React, { useState } from 'react';
import './App.css';
import Contents from './components/Contents';
import RegisterChat from './components/Register_chat';
import LeftNav from './components/LeftNav';
import Axios from 'axios';
Axios.defaults.baseURL = 'http://localhost:4000/api/'

function App() {
  const [ isValid, setIsValid ] = useState(false);
  const [ statusNav, setStatusNav ] = useState('word');
  const isLiving = getCookie('living');

  function getCookie(id) {
    const cookies = document.cookie.split(';');
    for (var cookie of cookies) {
      var parse = cookie.split('=')
      if (parse[0] === id) {
        return parse[1];
      }
    }
  }
  
  if (isLiving || isValid) {
    return (
      <div className="main_container">
        <LeftNav setStatus={setStatusNav} statusNav={statusNav}></LeftNav>
        <section className="section_content">
          <Contents nav={statusNav}></Contents>
        </section>
        <div className="dim"></div>
      </div>
    )
  } else {
    return (
      <RegisterChat setValid={setIsValid}></RegisterChat>
    );
  }
}


export default App;
