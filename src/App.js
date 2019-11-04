import React, { useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import RegisterChat from "./components/Register_chat";
import LeftNav from "./components/LeftNav";
import Header from './components/Header_main';

import WordManager from "./components/WordManager";
import Whitelist from "./components/Whitelist_URL";
import Log from "./components/Log";
import Faq from "./components/FAQ_register";
import Start from "./components/StartMenu";
import Users from "./components/UserManager";
import Dashboard from "./components/Dashboard";
import Modules from './components/Modules';
import Settings from './components/Settings';

import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:4000/api/";

function App() {
  const [isValid, setIsValid] = useState(false);
  const [statusNav, setStatusNav] = useState("word");
  const [chatInfo, setChatInfo] = useState([]);
  const isLiving = getCookie("living");

  function getCookie(id) {
    const cookies = document.cookie.split(";");
    
    for (var cookie of cookies) {
      var parse = cookie.split("=");
      if (parse[0].trim() === id) {
        return parse[1];
      }
    }
  }
  
  if (isLiving || isValid) {
    return (
      <Router>
        <Header></Header>
        <div className="main_container">
          <LeftNav setStatus={setStatusNav} statusNav={statusNav} setChatInfo={setChatInfo}></LeftNav>
          <section className="section_content">
            <Switch>
              <Route path="/" exact component={Dashboard}></Route>
              <Route path="/dashboard" component={Dashboard}></Route>
              <Route path="/modules" component={Modules}></Route>
              <Route path="/whitelist" component={Whitelist}></Route>
              <Route path="/blacklist" component={WordManager}></Route>
              <Route path="/faq" component={Faq}></Route>
              <Route path="/startmenu" component={Start}></Route>
              <Route path="/logs" component={Log}></Route>
              <Route path="/users" component={Users}></Route>
              <Route path="/settings" component={Settings}></Route>
            </Switch>
          </section>
          <div className="dim"></div>
        </div>
      </Router>
    );
  } else {
    return <RegisterChat setValid={setIsValid}></RegisterChat>;
  }
}

export default App;
