import React, { useState } from 'react';
import './App.css';
import Contents from './components/Contents';
import RegisterChat from './components/Register_chat';
import LeftNav from './components/LeftNav';

function App() {
  const [ isValid, setIsValid ] = useState(false);
  const [ statusNav, setStatusNav ] = useState('word');

  if (isValid) {
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
